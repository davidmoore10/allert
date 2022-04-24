import pytesseract
import cv2
import os
from deskew import determine_skew
import re
from shared_fns import deskew_fn, otsu_thresh_fn, compare_fn, test

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def median_blur_fn(img, aperture):
    img = cv2.medianBlur(img, aperture)
    return img

def otsu_thresh_fn(img):
    thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    result = 255-thresh
    return result
    
def ocr_test(img, txt, ksize):
    img = cv2.imread(img,0)
    with open(txt, 'r') as text_file:
        actual_text = text_file.read().rstrip()

    # Median blur
    median_blur = deskew_fn(img)
    median_blur = median_blur_fn(median_blur, ksize)
    median_blur = otsu_thresh_fn(median_blur)

    whitelist = ('-c tessedit_char_whitelist="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "')
    ocr_text = re.sub(' +', ' ', pytesseract.image_to_string(median_blur, config=whitelist).replace("\n", " ").lower())
    print(ocr_text + "\n")
    doc_score = compare_fn(ocr_text, actual_text)
    print(doc_score)
    return doc_score

def median_test(ksize):
    score = 0
    for file in os.listdir(directory):
        file_string = os.fsdecode(file)[:-4]
        img_file = "images\{}.JPG".format(file_string)
        txt_file = "img_texts\{}.txt".format(file_string)
        score += ocr_test(img_file, txt_file, ksize)
    return score

directory = os.fsencode('img_texts')
accumulated_scores = {}

for ksize in range(1, 27, 2):
    score = median_test(ksize)
    accumulated_scores[ksize] = score
    print(accumulated_scores)

print(accumulated_scores)

with open("test_results/median_results.txt", 'w') as f:
    f.write('Median Blurring Results\n')
    f.write(str(accumulated_scores))
    f.write("\n")