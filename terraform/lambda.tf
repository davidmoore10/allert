resource "aws_lambda_function" "ocr_lambda" {
  filename      = "${path.module}/../lambda_code/ocr_lambda.zip"
  function_name = "ocr_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "ocr_lambda.ocr_handler"
  runtime       = "python3.7"
  layers        = [aws_lambda_layer_version.tesseract_lambda_layer.arn, aws_lambda_layer_version.pylibs_lambda_layer.arn]
  timeout       = 60
  memory_size   = 1024
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