import pytesseract
import cv2
import os
# from deskew import determine_skew
# import numpy as np
import re
# from collections import Counter
# import math
from shared_fns import deskew_fn, otsu_thresh_fn, compare_fn, test


pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def bilateral_filter_fn(img, diameter, sigmaVal):
    img = cv2.bilateralFilter(img, diameter, sigmaVal, sigmaVal)
    return img

def ocr_test(img, txt, diameter, sigmaVal):
    img = cv2.imread(img,0)
    with open(txt, 'r') as text_file:
        actual_text = text_file.read().rstrip()

    # Bilateral filter
    bilateral_filter = deskew_fn(img)
    bilateral_filter = bilateral_filter_fn(bilateral_filter, diameter, sigmaVal)
    bilateral_filter = otsu_thresh_fn(bilateral_filter)

    whitelist = ('-c tessedit_char_whitelist="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "')
    ocr_text = re.sub(' +', ' ', pytesseract.image_to_string(bilateral_filter, config=whitelist).replace("\n", " ").lower())
    print(ocr_text)
    doc_score = compare_fn(ocr_text, actual_text)
    print(str(doc_score) + "\n")
    return doc_score

def bilateral_test(diameter, sigmaVal):
    score = 0
    for file in os.listdir(directory):
        file_string = os.fsdecode(file)[:-4]
        img_file = "images\{}.JPG".format(file_string)
        txt_file = "img_texts\{}.txt".format(file_string)
        score += ocr_test(img_file, txt_file, diameter, sigmaVal)
    return score

directory = os.fsencode('img_texts')
accumulated_scores_sigma = {}
accumulated_scores_diameter = {}

for sigmaVal in range(0, 205, 25):
    score = bilateral_test(9, sigmaVal)
    accumulated_scores_sigma[sigmaVal] = score
    print(accumulated_scores_sigma)

print(accumulated_scores_sigma)

with open("test_results/bilateral_results.txt", 'w') as f:
    f.write('Sigma Results (0-200)\n')
    f.write(str(accumulated_scores_sigma))
