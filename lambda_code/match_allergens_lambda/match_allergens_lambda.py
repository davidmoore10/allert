import json

def set_compare(text, alls):
    return not set(text).isdisjoint(set(alls))

def match_allergens_handler(event, context):

    # Take output from parallel lambdas
    ocr_text = event[0]
    allergensDict = event[1]

    resp = []

    # Iterate through each user allergy
    for allergy, allergens in allergensDict.items():
        
        # If terms found, add allergy to output list
        if set_compare(ocr_text, allergens):
            resp.append(allergy)
            
    return {
        'statusCode': 200,
        'body': json.dumps(resp)
    }