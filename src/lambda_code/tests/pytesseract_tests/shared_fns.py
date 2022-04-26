import cv2
import os
from deskew import determine_skew
import numpy as np
import re
from collections import Counter
import math
from nltk.tokenize import word_tokenize
WORD = re.compile(r"\w+")

def deskew_fn(img):
    angle = determine_skew(img)
    image_center = tuple(np.array(img.shape[1::-1]) / 2)
    rot_mat = cv2.getRotationMatrix2D(image_center, angle, 1.0)
    result = cv2.warpAffine(img, rot_mat, img.shape[1::-1], flags=cv2.INTER_LINEAR)
    return result

def otsu_thresh_fn(img):
    deskew_fn(img)
    result = cv2.threshold(img, 0, 255, cv2.THRESH_OTSU)[1]
    return result

def text_to_vector(text):
    words = WORD.findall(text)
    return Counter(words)

# String cosine similarity function from https://stackoverflow.com/a/15174569
# def compare_fn(ocr, txt):
#     ocr = text_to_vector(ocr)
#     txt = text_to_vector(txt)
#     intersection = set(ocr.keys()) & set(txt.keys())
#     numerator = sum([ocr[x] * ocr[x] for x in intersection])

#     sum1 = sum([ocr[x] ** 2 for x in list(ocr.keys())])
#     sum2 = sum([txt[x] ** 2 for x in list(txt.keys())])
#     denominator = math.sqrt(sum1) * math.sqrt(sum2)

#     if not denominator:
#         return 0.0
#     else:
#         return float(numerator) / denominator

def compare_fn(ocr, txt):
    ocr = set(word_tokenize(ocr))
    txt = set(word_tokenize(txt))
    l1 = []
    l2 = []

    rvector = ocr.union(txt) 
    for w in rvector:
        if w in ocr: l1.append(1) # create a vector
        else: l1.append(0)
        if w in txt: l2.append(1)
        else: l2.append(0)
    c = 0
    # cosine formula 
    for i in range(len(rvector)):
            c+= l1[i]*l2[i]
    divisor = float((sum(l1)*sum(l2))**0.5)
    if divisor == 0:
        divisor = 0.01
    cosine = c / divisor
    return cosine

def test(val):
    score = 0
    for file in os.listdir(directory):
        file_string = os.fsdecode(file)[:-4]
        img_file = "images\{}.JPG".format(file_string)
        txt_file = "img_texts\{}.txt".format(file_string)
        score += ocr_test(img_file, txt_file, val)
    return score