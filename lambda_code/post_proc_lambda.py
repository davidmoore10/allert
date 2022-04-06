import json
import base64
import re
from collections import OrderedDict
      
def post_proc_handler(event, context):
    
    # Load the OCRd text
    body = json.loads(event["body"])
    text = body["ocr_text"]
    
    # Remove non alpha chars, list, sort and eliminate duplicates
    text = re.sub('[^a-zA-Z ]', "", text)
    text = text.split()
    text.sort()
    text = list(OrderedDict.fromkeys(text))

    # Return the result in json format
    body["ocr_text"] = text
    event["body"] = body

    return {
        'statusCode': 200,
        'body': json.dumps(event)
    }