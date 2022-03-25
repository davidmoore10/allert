import json
import boto3
import pytesseract
from PIL import Image

s3_client = boto3.client("s3")
S3_BUCKET_NAME = 'template-s3-bucket-662941'
S3_OBJECT_KEY = 'IMG_4860_CROP.jpg'

def ocr_handler(event, context):
    img = s3_client.get_object(Bucket=S3_BUCKET_NAME, Key=S3_OBJECT_KEY)
    request_body = json.loads(event['body'])
    image = s3_client.get_object(img)

    text = pytesseract.image_to_string(Image.open(image))

    body = {
        "text": text
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response