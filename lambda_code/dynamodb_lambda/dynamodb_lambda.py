import json
import boto3
from boto3.dynamodb.conditions import Key

def dynamodb_handler(event, context):

    body = json.loads(event['body'])
    allergies = body['allergies']

    client = boto3.resource('dynamodb')
    table = client.Table('allergen_table')

    out = {}

    # Query dynamodb for known allergens for each user allergy
    for allergy in allergies:
        resp = table.query(
            KeyConditionExpression=Key('allergy').eq(allergy)
        )
        
        strAlls = resp["Items"][0]["allergens"]
        known_alls = strAlls.split(",")

        # Add to the output a dictionary of allergy with associated allergens
        out[allergy] = known_alls
        
    body['allergensDict'] = out

    return {
        'statusCode': 200,
        'body': json.dumps(body)
    }