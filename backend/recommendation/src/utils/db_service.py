import logging
from bson import ObjectId
from pymongo import MongoClient
import numpy as np  # Needed to check for numpy arrays

def connect_to_mongo(uri: str, db_name: str):
    """
    Connect to the MongoDB database using the provided URI and database name.
    """
    try:
        client = MongoClient(uri)
        db = client[db_name]
        logging.info(f"Successfully connected to MongoDB database: {db_name}")
        return db
    except Exception as e:
        logging.error("Error connecting to MongoDB: %s", e)
        raise

def get_all_job_embeddings(jobs_collection):
    """
    Retrieve all job embeddings along with their ID and required experience.
    """
    cursor = jobs_collection.find({}, {"_id": 1, "embedding": 1, "experience": 1})
    job_list = []
    for doc in cursor:
        job = {
            "id": str(doc.get("_id")),  # Convert ObjectId to string
            "embedding": doc.get("embedding"),
            "experience": doc.get("experience")
        }
        job_list.append(job)
    return job_list

def get_job_details_by_ids(jobs_collection, job_ids: list, current_user_id: str = None) -> dict:
    """
    Retrieve detailed job information for specific job IDs.
    Returns a dict keyed by job id (as a string).
    If current_user_id is provided, adds an 'applied' flag (True/False)
    based on whether the user's ObjectId is present in the 'applicants' field.
    """
    object_ids = [ObjectId(id_) for id_ in job_ids]
    cursor = jobs_collection.find(
        {"_id": {"$in": object_ids}},
        {
            "_id": 1,
            "title": 1,
            "description": 1,
            "experience": 1,
            "company": 1,
            "applicants": 1  # Include applicants for checking applied status
        }
    )
    
    job_details = {}
    for doc in cursor:
        job_id = str(doc["_id"])
        applied = False
        if current_user_id:
            try:
                applied = ObjectId(current_user_id) in doc.get("applicants", [])
            except Exception as e:
                applied = False
        job_details[job_id] = {
            "_id": job_id,
            "title": doc.get("title", "N/A"),
            "description": doc.get("description", "N/A"),
            "experience": doc.get("experience", "N/A"),
            "company": doc.get("company", "N/A"),
            "applied": applied
        }
    return job_details

def get_job_skills_by_ids(jobs_collection, job_ids: list) -> dict:
    """
    Retrieve skills required for specific job IDs.
    """
    object_ids = [ObjectId(id_) for id_ in job_ids]
    cursor = jobs_collection.find(
        {"_id": {"$in": object_ids}},
        {"_id": 1, "skills": 1}
    )
    
    job_skills = {}
    for doc in cursor:
        job_id = str(doc["_id"])
        job_skills[job_id] = doc.get("skills", [])
    return job_skills

def save_user_recommendations(db, user_id: str, job_ids: list):
    """
    Save recommended job IDs to user's document.
    """
    users_collection = db["users"]
    try:
        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"recommended_jobs": job_ids}}
        )
        return result.modified_count > 0
    except Exception as e:
        logging.error(f"Error saving recommendations: {e}")
        return False

def store_user_cv_embedding(db, user_id: str, cv_embedding):
    """
    Store the CV embedding in the user's document.
    Converts the embedding to a list if it is a NumPy array.
    """
    users_collection = db["users"]
    try:
        # Convert cv_embedding to a list if it's a NumPy array
        if isinstance(cv_embedding, np.ndarray):
            cv_embedding = cv_embedding.tolist()
        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"cv_embedding": cv_embedding}}
        )
        return result.modified_count > 0
    except Exception as e:
        logging.error(f"Error storing CV embedding: {e}")
        return False

def apply_to_job(db, job_id: str, user_id: str) -> bool:
    """
    Add the user_id to the job's 'applicants' array (creates the field if it doesn't exist).
    """
    jobs_collection = db["job"]
    try:
        result = jobs_collection.update_one(
            {"_id": ObjectId(job_id)},
            {"$addToSet": {"applicants": ObjectId(user_id)}}
        )
        return result.modified_count > 0
    except Exception as e:
        logging.error(f"Error applying to job: {e}")
        return False
