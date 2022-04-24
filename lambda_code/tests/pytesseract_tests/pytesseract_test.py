import pytesseract
import cv2
import os
import re
from shared_fns import deskew_fn, otsu_thresh_fn, compare_fn, test

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def median_blur_fn(img):
    img = cv2.medianBlur(img, 7)
    return img

def bilateral_filter_fn(img):
    img = cv2.bilateralFilter(img,9,75,75)
    return img

def adaptive_thresh_fn(img):
    result = deskew_fn(img)
    result = cv2.adaptiveThreshold(result, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 51, 2)
    return result

def imshow_fn(img):
    return cv2.resize(img, dsize=(900,900),interpolation=cv2.INTER_CUBIC)

def ocr_test(img, txt):
    print(img + "\n")
    img = cv2.imread(img,0)
    with open(txt, 'r') as text_file:
        actual_text = text_file.read().rstrip()

    results = []

    # Basic Adaptive
    adaptive = adaptive_thresh_fn(img)
    results.append(("Basic Adaptive Threshold", adaptive))
    showim = imshow_fn(adaptive)

    # Basic Otsu
    basic = otsu_thresh_fn(img)
    results.append(("Basic Otsu Threshold", basic))

    # Bilateral filter
    bilateral_filter = bilateral_filter_fn(img)
    bilateral_filter = otsu_thresh_fn(bilateral_filter)
    results.append(("Bilateral filter", bilateral_filter))

    # Median blur
    median_blur = median_blur_fn(img)
    median_blur = otsu_thresh_fn(median_blur)
    results.append(("Median blur", median_blur))

    # Bilateral filter and Median Blur
    bi_median = bilateral_filter_fn(img)
    bi_median = median_blur_fn(bi_median)
    bi_median = otsu_thresh_fn(bi_median)
    imshow = bi_median
    results.append(("Bilateral Filter & Median Blur", bi_median))

    whitelist = ('-c tessedit_char_whitelist="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "')
    for i in results:
        ocr_text = re.sub(' +', ' ', pytesseract.image_to_string(i[1], config=whitelist).replace("\n", " ").lower())
        score = compare_fn(ocr_text, actual_text)
        accumulated_scores[i[0]] += score
        print(i[0] + ":\n" + ocr_text + "\n" + "Score: {}\n".format(score))

    # cv2.imshow('image', showim)
    # cv2.waitKey(0)

directory = os.fsencode('img_texts')
accumulated_scores = {"Basic Adaptive Threshold": 0,"Basic Otsu Threshold": 0, "Bilateral filter": 0, "Median blur": 0, "Bilateral Filter & Median Blur": 0}

for file in os.listdir(directory):
    file_string = os.fsdecode(file)[:-4]
    img_file = "images\{}.JPG".format(file_string)
    txt_file = "img_texts\{}.txt".format(file_string)
    ocr_test(img_file, txt_file)
    print(accumulated_scores)

print(accumulated_scores)

with open("test_results/pytesseract_results.txt", 'w') as f:
    f.write('Preprocessing Method Results\n')
    f.write(str(accumulated_scores))
    f.write("\n")