import json
import base64
import re
from collections import OrderedDict
      
def post_proc_handler(event, context):
    
    # Load the OCRd text

    text = event["ocr_text"]
    
    # Remove non alpha chars, list, sort and eliminate duplicates
    text = re.sub('[^a-zA-Z ]', "", text)
    text = text.split()
    text.sort()
    text = list(OrderedDict.fromkeys(text))

    # Return the result in json format
    event["ocr_text"] = text
    del event["user_id"]

    return {
        'statusCode': 200,
        'body': json.dumps(event)
    }