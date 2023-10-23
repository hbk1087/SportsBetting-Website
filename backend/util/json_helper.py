import json
from bson import ObjectId
 
class JSONEncoder(json.JSONEncoder):
    def default(self, item):
        if isinstance(item, ObjectId):
            return str(item)
        return json.JSONEncoder.default(self, item)
