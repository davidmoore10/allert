import json

def match_allergens_handler(event, context):

    body = json.loads(event['body'])

    ocr_text = body['ocr_text']
    allergies = body['allergies']
    allergensDict = body['allergensDict']

    resp = []

    # Iterate through each user allergy
    for allergy in allergies:
        allergens = allergensDict[allergy]

        # Find if there are any matches between OCR text and user allergy ingredients
        if any(i in ocr_text for i in allergens):
            resp.append(allergy)

    return {
        'statusCode': 200,
        'body': json.dumps(resp)
    }