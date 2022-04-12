import re
from collections import OrderedDict
      
def post_proc_handler(event, context):
    
    # Load the OCRd text
    text = event
    
    # Remove non alpha chars
    text = re.sub('[^a-zA-Z ]', "", text)
    
    # Split tokens into list
    text = text.split()
    
    # Sort list
    text.sort()
    
    # Remove duplicate terms
    text = list(OrderedDict.fromkeys(text))

    return text