import boto3
import requests

def lambda_handler(event, context):
    result = requests.get("https://www.dcu.ie/computing")
    return {
        'statusCode' : 200,
        'body': result
    }