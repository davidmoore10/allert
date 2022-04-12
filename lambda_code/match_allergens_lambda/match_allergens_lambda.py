import json

def set_compare(text, alls):
    return set(text) & set(alls)

def match_allergens_handler(event, context):

    # Take output from parallel lambdas
    ocr_text = event[0]
    allergensDict = event[1]

    resp = []

    # Iterate through each user allergy
    for allergy, allergens in allergensDict.items():
        
        # Find terms in common between OCR and allergens related to user allergy
        matches = set_compare(ocr_text, allergens)
        
        # print(allergy + ": " + str(matches))
        
        # If terms found, add allergy to output list
        if len(matches) != 0:
            resp.append(allergy)
            
    return {
        'statusCode': 200,
        'body': json.dumps(resp)
    }