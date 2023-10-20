import requests
from dotenv import load_dotenv
import os
import json
from models.NFLModel import NFLModel

# load_dotenv()

# secret_key = os.getenv('API_KEY')
# # Replace this URL with the actual API URL you want to call
# api_url = f"https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey={secret_key}&regions=us&markets=h2h,spreads,totals&oddsFormat=decimal&bookmakers=fanduel"
# print(api_url)
# # Send a GET request to the API
# response = requests.get(api_url)

# json_object = json.loads(response.text)

# json_formatted_str = json.dumps(json_object, indent=2)

nfl = NFLModel()


res = nfl.apiPredict()


print(res)


    #print(response.text)