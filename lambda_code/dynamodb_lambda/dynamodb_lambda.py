import json
import boto3
from boto3.dynamodb.conditions import Key

def dynamodb_handler(event, context):

    body = json.loads(event['body'])
    allergies = body['allergies']

    client = boto3.resource('dynamodb')
    table = client.Table('allergen_table')

    out = []

    # Query dynamodb for known allergens for each user allergy
    for allergy in allergies:
        resp = table.query(
            KeyConditionExpression=Key('allergy').eq(allergy)
        )

        known_alls = []

        # Do some processing on the query output
        for i in resp["Items"]:
            known_alls.append(i["allergens"])

        # Add to the output a dictionary of allergy with associated allergens
        out.append({allergy: known_alls})
        
    body['allergies'] = out

    return {
        'statusCode': 200,
        'body': json.dumps(body)
    }