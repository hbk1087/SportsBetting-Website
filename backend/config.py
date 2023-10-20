import os

# Get Mongo credentials from env
MONGO_USERNAME = os.getenv('MONGO_USERNAME')
MONGO_PASSWORD = os.getenv('MONGO_PASSWORD')
MONGO_URI = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@sportsbet.ah9rvyf.mongodb.net/?retryWrites=true&w=majority"

# Flask app configuration
DEBUG = True

# TO-DO: Figure out what a secret key is?