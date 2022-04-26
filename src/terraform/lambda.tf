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

data "archive_file" "match_allergens_lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda_code/match_allergens_lambda"
  output_path = "${path.module}/../lambda_code/match_allergens_lambda.zip"
}

resource "aws_lambda_function" "ocr_lambda" {
  function_name = "ocr_lambda"
  role          = aws_iam_role.lambda_role.arn
  package_type  = "Image"
  image_uri     = "260350295037.dkr.ecr.eu-west-1.amazonaws.com/ocr_ecr:latest"
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

resource "aws_lambda_function" "match_allergens_lambda" {
  filename      = "${path.module}/../lambda_code/match_allergens_lambda.zip"
  function_name = "match_allergens_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "match_allergens_lambda.match_allergens_handler"
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
  source_arn    = "arn:aws:execute-api:eu-west-1:260350295037:${aws_api_gateway_rest_api.allert_rest_api.id}/*/*/*"
}