#!/bin/bash

sudo docker build -t ocr_lambda .
id=`docker images | awk '/260350295037.dkr.ecr.eu-west-1.amazonaws.com/ocr_ecr/ {print $3}'`
docker tag $id 260350295037.dkr.ecr.eu-west-1.amazonaws.com/ocr_ecr
docker push 260350295037.dkr.ecr.eu-west-1.amazonaws.com/ocr_ecr