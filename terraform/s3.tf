resource "aws_s3_bucket" "template_s3" {
  bucket = "template-s3-bucket-662941"
  acl    = "private"

  tags = {
    Name = "TemplateS3Bucket"
  }
}