resource "aws_lambda_function" "hello_world_lambda" {
  filename = "${path.module}/../lambda_cod/test_lambda.zip"
  function_name = "hello_world"
  role          = aws_iam_role.lambda_role.arn
  handler       = "test_lambda.lambda_handler"
  runtime       = "python3.8"
}