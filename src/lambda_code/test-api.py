import requests
import json

api_url = "https://bid4tm2l7g.execute-api.eu-west-1.amazonaws.com/default"
f = open('test_jsons\ocr_test2.json')
todo = json.load(f)
response= requests.post(api_url, json=todo)
print(response.json())