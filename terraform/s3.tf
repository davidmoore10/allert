resource "aws_s3_bucket" "lambda_code_bucket" {
  bucket = "lambda-code-bucket-7050736"
  acl    = "private"

  tags = {
    Name = "Lambda Bucket"
  }
}