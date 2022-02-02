resource "aws_lambda_function" "hello_world_lambda" {
  function_name = "hello_world"
  s3_bucket     = "lambda-code-bucket-7050736"
  s3_key        = "hello_py.zip"
  role          = aws_iam_role.lambda_role.arn
  handler       = "hello_py.handler"
  runtime       = "nodejs12.x"
}