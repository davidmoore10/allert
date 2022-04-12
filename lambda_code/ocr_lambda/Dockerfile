FROM public.ecr.aws/lambda/python:3.8
COPY requirements.txt ./requirements.txt
RUN pip install -r requirements.txt
RUN rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
RUN yum -y update
RUN yum -y install tesseract
COPY ./ocr_lambda.py   ./
RUN aws configure set aws_access_key_id ""
RUN aws configure set aws_secret_access_key ""
RUN aws configure set region ""
RUN aws configure set output ""
CMD ["ocr_lambda.ocr_handler"]