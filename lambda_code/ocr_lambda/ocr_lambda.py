import json
import boto3
import base64
import pytesseract
import uuid

client = boto3.client('stepfunctions')

def ocr(img):
  
  # Perform OCR, remove newlines and convert all chars to lowercase
  ocr_text = pytesseract.image_to_string(img).strip().replace("\n", " ").lower()
  return ocr_text
      
def ocr_handler(event, context):
  
    # This and the uuid import can probably be removed when API gateway is implemented.
    # Need a unique ID for trigger SF, this will be in API call?
    user_id = str(uuid.uuid1())
    body_image64 = event['image64']
    allergies = event['user_allergies']

    # Decode & save image to /tmp
    with open("/tmp/saved_img.png", "wb") as f:
      f.write(base64.b64decode(body_image64))
    
    # Ocr
    ocr_text = ocr("/tmp/saved_img.png")
    
    # Wrap the result data as dictionary, use as input for step function
    input = {"user_id": user_id, "ocr_text": ocr_text, "allergies": allergies}
    
    # Triggering step function
    response = client.start_execution(
      stateMachineArn = 'arn:aws:states:eu-west-1:260350295037:stateMachine:allert_step_function',
      name = user_id,
      input = json.dumps(input)
      )
      
    print(response)
    
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps(response)
    # }
