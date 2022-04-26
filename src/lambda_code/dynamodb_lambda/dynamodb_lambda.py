import boto3
from boto3.dynamodb.conditions import Key

def dynamodb_query(allergy, table):
    
    # Perform dynamodb query
    resp = table.query(
        KeyConditionExpression=Key('allergy').eq(allergy)
    )
    
    # Clean up and return allergens
    strAlls = resp["Items"][0]["allergens"]
    known_alls = strAlls.split(",")
    return known_alls

def dynamodb_handler(event, context):
    
    allergies = event

    # Set up dynamodb query with boto3
    client = boto3.resource('dynamodb')
    table = client.Table('allergen_table')

    out = {}

    # Query dynamodb for known allergens for each user allergy
    for allergy in allergies:
        
        # Add to the output a dictionary of allergy with associated allergens
        out[allergy] = dynamodb_query(allergy, table)
    
    return out