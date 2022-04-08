resource "aws_api_gateway_rest_api" "allert-rest-api" {
  name = "allert-rest-api"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  binary_media_types = ["image/jpeg", "image/png", "*/*"]
}

resource "aws_api_gateway_method" "getAllergyFlags" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_rest_api.allert-rest-api.root_resource_id
  rest_api_id   = aws_api_gateway_rest_api.allert-rest-api.id
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = aws_api_gateway_rest_api.allert-rest-api.id
  resource_id             = aws_api_gateway_rest_api.allert-rest-api.root_resource_id
  http_method             = aws_api_gateway_method.getAllergyFlags.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.ocr_lambda.invoke_arn
}
