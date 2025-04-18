# src/config.py

import os
from dotenv import load_dotenv

load_dotenv()  # Reads .env file at the root

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in .env")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI is not set in .env")

if not MONGODB_DB_NAME:
    raise ValueError("MONGODB_DB_NAME is not set in .env")
