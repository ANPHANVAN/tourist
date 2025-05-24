from flask import Flask, jsonify, g
from flask_cors import CORS  # Import CORS
import os
import logging

MONGO_LINK = os.getenv("MONGO_LINK")
app = Flask(__name__)

# Thêm CORS vào ứng dụng Flask
CORS(app)  # Cho phép tất cả các origin truy cập API

from model import model

@app.route('/<user_id>', methods=['GET'])
def suggest_user_destination(user_id):
    try:
        recommendations = model.get_user_recommendations(user_id)
        if not recommendations:
            return jsonify({"message": "No recommendations available", "suggestions": [], "user_id": user_id}), 404
        return jsonify({
            "user_id": user_id,
            "suggestions": recommendations
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def suggest_popular_destination():
    try:
        recommendations = model.get_popular_recommendations()
        return jsonify({
            "suggestions": recommendations
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Health check
@app.route('/health')
def health():
    return jsonify({'status': 'OK'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)