import os
MONGO_LINK = os.getenv("MONGO_LINK")
from pymongo import MongoClient
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import LabelEncoder

class RecommendationModel:
    def __init__(self):
        self.client = MongoClient(MONGO_LINK)
        self.db = self.client['tourist_project']
        self.destinations = list(self.db.destinations.find())
        self.users = list(self.db.users.find())
        self.user_encoder = LabelEncoder()
        self.dest_encoder = LabelEncoder()
        self.user_item_matrix = self._build_user_item_matrix()

    def _build_user_item_matrix(self):
        user_ids = [str(user['_id']) for user in self.users]
        dest_ids = [str(dest['_id']) for dest in self.destinations]
        print(f"Loaded users: {len(user_ids)}, Destinations: {len(dest_ids)}")
        self.user_encoder.fit(user_ids)
        self.dest_encoder.fit(dest_ids)

        matrix = np.zeros((len(user_ids), len(dest_ids)))
        for dest in self.destinations:
            for user_id in dest.get('like_user', []):
                user_id_str = str(user_id)
                if user_id_str in user_ids:
                    user_idx = self.user_encoder.transform([user_id_str])[0]
                    dest_idx = self.dest_encoder.transform([str(dest['_id'])])[0]
                    matrix[user_idx][dest_idx] = 1
            for user_id in dest.get('went_user', []):
                user_id_str = str(user_id)
                if user_id_str in user_ids:
                    user_idx = self.user_encoder.transform([user_id_str])[0]
                    dest_idx = self.dest_encoder.transform([str(dest['_id'])])[0]
                    matrix[user_idx][dest_idx] = 2
        print(f"Matrix shape: {matrix.shape}")
        return matrix

    def get_user_recommendations(self, user_id, top_n=6):
        print("user_id",user_id)
        user_ids = [str(user['_id']) for user in self.users]
        if str(user_id) not in user_ids:
            print(f"User {user_id} not found in users collection")
            return self.get_popular_recommendations(top_n)

        try:
            user_idx = self.user_encoder.transform([user_id])[0]
            print(f"User index: {user_idx}, User interactions: {self.user_item_matrix[user_idx]}")
        except ValueError as e:
            print(f"ValueError: {e} - User {user_id} not found in encoder")
            return self.get_popular_recommendations(top_n)

        user_similarities = cosine_similarity([self.user_item_matrix[user_idx]], self.user_item_matrix)[0]
        similar_users = user_similarities.argsort()[::-1][1:11]
        print(f"Similar users indices: {similar_users}, Similarities: {user_similarities[similar_users]}")

        scores = np.zeros(len(self.destinations))
        for similar_user in similar_users:
            scores += self.user_item_matrix[similar_user]
        print(f"Scores before filtering: {scores}")

        user_interactions = self.user_item_matrix[user_idx]
        for dest_idx in range(len(self.destinations)):
            if user_interactions[dest_idx] > 0:
                scores[dest_idx] = -1
        print(f"Scores after filtering: {scores}")

        recommended_indices = scores.argsort()[::-1][:top_n]
        recommendations = [self.destinations[i] for i in recommended_indices if scores[i] > 0]
        print(f"Initial recommendations: {len(recommendations)}, Indices: {recommended_indices}")

        print(f"Final recommendations: {len(recommendations)} destinations")
        if not recommendations:
            return self.get_popular_recommendations()
        return self.normalize_recommendations(recommendations)
    
    def get_popular_recommendations(self, top_n=6):
        """Tạo gợi ý phổ biến dựa trên lượt like và went, trả về tất cả các trường"""
        destinations_with_scores = [
            (dest, (dest.get('like_count', 0) + dest.get('went_count', 0)))
            for dest in self.destinations
        ]
        sorted_destinations = sorted(destinations_with_scores, key=lambda x: x[1], reverse=True)
        top_destinations = sorted_destinations[:top_n]

        normalized_recommendations = []
        for dest, _ in top_destinations:
            normalized_item = {}
            for key, value in dest.items():
                if key == "_id":
                    normalized_item[key] = str(value)  # Chuyển ObjectId thành chuỗi
                elif key in ("like_user", "went_user"):
                    normalized_item[key] = [str(user_id) for user_id in value]  # Chuyển danh sách ObjectId thành danh sách chuỗi
                elif key in ("createdAt", "updatedAt"):
                    normalized_item[key] = value.isoformat() if value else None  # Chuyển datetime thành chuỗi ISO
                else:
                    normalized_item[key] = value  # Giữ nguyên các trường khác
            normalized_recommendations.append(normalized_item)

        print(f"Popular recommendations: {len(normalized_recommendations)} destinations, Data: {normalized_recommendations}")
        return normalized_recommendations
    
    
    def normalize_recommendations(self, recommendations):
        """Chuyển đổi recommendations thành dạng JSON serializable, giữ lại tất cả các trường"""
        normalized = []
        for item in recommendations:
            # Tạo một dictionary mới bằng cách sao chép item
            normalized_item = {}
            
            # Duyệt qua tất cả các key trong item
            for key, value in item.items():
                if key == "_id":
                    # Chuyển ObjectId thành chuỗi
                    normalized_item[key] = str(value)
                elif key in ("like_user", "went_user"):
                    # Chuyển danh sách ObjectId thành danh sách chuỗi
                    normalized_item[key] = [str(user_id) for user_id in value]
                elif key in ("createdAt", "updatedAt"):
                    # Chuyển datetime thành chuỗi ISO format
                    normalized_item[key] = value.isoformat() if value else None
                else:
                    # Giữ nguyên các trường khác
                    normalized_item[key] = value
            
            normalized.append(normalized_item)
        return normalized
# Khởi tạo model
model = RecommendationModel()