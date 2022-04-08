data "archive_file" "ocr_lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda_code/ocr_lambda"
  output_path = "${path.module}/../lambda_code/ocr_lambda.zip"
}

data "archive_file" "post_proc_lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda_code/post_proc_lambda"
  output_path = "${path.module}/../lambda_code/post_proc_lambda.zip"
}

data "archive_file" "dynamodb_lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda_code/dynamodb_lambda"
  output_path = "${path.module}/../lambda_code/dynamodb_lambda.zip"
}

resource "aws_lambda_function" "ocr_lambda" {
  filename      = "${path.module}/../lambda_code/ocr_lambda.zip"
  function_name = "ocr_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "ocr_lambda.ocr_handler"
  runtime       = "python3.7"
  layers        = [aws_lambda_layer_version.tesseract_lambda_layer.arn, aws_lambda_layer_version.pylibs_lambda_layer.arn]
  timeout       = 60
  memory_size   = 2048
}

resource "aws_lambda_function" "post_proc_lambda" {
  filename      = "${path.module}/../lambda_code/post_proc_lambda.zip"
  function_name = "post_proc_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "post_proc_lambda.post_proc_handler"
  runtime       = "python3.7"
}

resource "aws_lambda_function" "dynamodb_lambda" {
  filename      = "${path.module}/../lambda_code/dynamodb_lambda.zip"
  function_name = "dynamodb_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "dynamodb_lambda.dynamodb_handler"
  runtime       = "python3.7"
}

resource "aws_lambda_layer_version" "tesseract_lambda_layer" {
  filename            = "${path.module}/../lambda_code/tesseract-layer.zip"
  layer_name          = "tesseract_layer"
  compatible_runtimes = ["python3.7"]
}

resource "aws_lambda_layer_version" "pylibs_lambda_layer" {
  filename            = "${path.module}/../lambda_code/pylibs-layer.zip"
  layer_name          = "pylibs_layer"
  compatible_runtimes = ["python3.7"]
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ocr_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "arn:aws:execute-api:eu-west-1:260350295037:${aws_api_gateway_rest_api.allert-rest-api.id}/*/*/*"
}