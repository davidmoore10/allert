import json
import base64
import pytesseract
    
def ocr(img):

  ocr_text = pytesseract.image_to_string(img).strip()
  return ocr_text
      
def ocr_handler(event, context):
    
    body_image64 = event['image64']
    allergies = event['user_allergies']
    
    # Decode & save image to /tmp
    with open("/tmp/saved_img.png", "wb") as f:
      f.write(base64.b64decode(body_image64))
    
    # Ocr
    ocr_text = ocr("/tmp/saved_img.png")
    
    # Return the result data in json format
    event["ocr_text"] = ocr_text
    del event["image64"]
    
    return {
        'statusCode': 200,
        'body': json.dumps(event)
    }
