from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace
import os
import json
from werkzeug.utils import secure_filename

import numpy as np


app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = "uploads"
EMBEDDINGS_FILE = "embeddings/users.json"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.dirname(EMBEDDINGS_FILE), exist_ok=True)

def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    return dot_product / (norm_vec1 * norm_vec2)


if not os.path.exists(EMBEDDINGS_FILE):
    with open(EMBEDDINGS_FILE, "w") as f:
        json.dump([], f)

def load_embeddings():
    if os.path.exists(EMBEDDINGS_FILE):
        with open(EMBEDDINGS_FILE, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return [] 


def save_embeddings(data):
    with open(EMBEDDINGS_FILE, "w") as f:
        json.dump(data, f)


@app.route('/add', methods=['POST'])
def add_user():
    if 'file' not in request.files or 'name' not in request.form:
        return jsonify({"error": "Missing file or name"}), 400

    
    file = request.files['file']
    name = request.form['name']
    filepath = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    file.save(filepath)


    try:
        embedding = DeepFace.represent(img_path=filepath, model_name="Facenet")[0]["embedding"]
        print(f"Embedding generated: {embedding[:5]}...")
    except Exception as e:
        return jsonify({"error": f"Embedding extraction failed: {str(e)}"}), 500


    users = load_embeddings() 
    user_id = len(users) + 1
    users.append({"id": user_id, "name": name, "embedding": embedding})


    print(f"Saving user data: {users[-1]}")

    save_embeddings(users)

    return jsonify({"message": "User added successfully", "user_id": user_id}), 200


@app.route('/search', methods=['POST'])
def search_user():
    if 'file' not in request.files:
        return jsonify({"error": "Missing file"}), 400

    file = request.files['file']
    filepath = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    file.save(filepath)

    try:
        search_embedding = DeepFace.represent(img_path=filepath, model_name="Facenet")[0]["embedding"]
        print(f"Search embedding: {search_embedding[:5]}")
    except Exception as e:
        return jsonify({"error": f"Embedding extraction failed: {str(e)}"}), 500

    users = load_embeddings()
    similarity_threshold = 0.20
    matches = []

    for user in users:
        user_embedding = user["embedding"]
        similarity = cosine_similarity(search_embedding, user_embedding)
        print(f"Comparing with {user['name']} - Similarity: {similarity:.4f}")  

        if similarity >= (1 - similarity_threshold): 
            matches.append({"id": user["id"], "name": user["name"], "similarity": similarity})

    if matches:
        return jsonify({"matches": matches}), 200
    else:
        return jsonify({"message": "No matches found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)
