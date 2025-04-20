from flask import Flask, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__)

# # Cấu hình PostgreSQL từ biến môi trường
# def get_db_connection():
#     conn = psycopg2.connect(
#         host=os.getenv('POSTGRES_HOST', 'postgres'),
#         port=os.getenv('POSTGRES_PORT', '5432'),
#         user=os.getenv('POSTGRES_USER', 'admin'),
#         password=os.getenv('POSTGRES_PASSWORD', 'secret'),
#         database=os.getenv('POSTGRES_DB', 'travel_db')
#     )
#     return conn

# Route hiển thị danh sách tour
@app.route('/')
def get_tours():
    # try:
    #     conn = get_db_connection()
    #     cursor = conn.cursor(cursor_factory=RealDictCursor)
    #     cursor.execute('SELECT * FROM tours LIMIT 5')
    #     tours = cursor.fetchall()
    #     cursor.close()
    #     conn.close()
    #     return jsonify(tours)
    # except Exception as e:
    #     return jsonify({'error': 'my found'}), 500

    return jsonify({'route': '/'})
    
@app.route('/tours')
def recommend():
    return jsonify({'route': '/tours'})

@app.route('/add')
def add():
    return jsonify({'route': '/add'})

@app.route('/magana')
def magana():
    return jsonify({'route': '/magana'})
# Health check
@app.route('/health')
def health():
    return jsonify({'status': 'OK'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)