resource "aws_api_gateway_rest_api" "allert_rest_api" {
  name = "allert_rest_api"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  binary_media_types = ["image/jpeg", "image/png", "*/*"]
}

resource "aws_api_gateway_deployment" "allert_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.allert_rest_api.id
  stage_name  = "default"
  depends_on = [
    aws_api_gateway_integration.integration
  ]
}

resource "aws_api_gateway_stage" "allert_api_stage" {
  deployment_id = aws_api_gateway_deployment.allert_api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.allert_rest_api.id
  stage_name    = "allert_api_stage"
}

resource "aws_api_gateway_method_settings" "allert_settings" {
  rest_api_id = aws_api_gateway_rest_api.allert_rest_api.id
  stage_name  = aws_api_gateway_deployment.allert_api_deployment.stage_name
  method_path = "*/*"

  settings {
    # Enable CloudWatch logging and metrics
    metrics_enabled    = true
    data_trace_enabled = true
    logging_level      = "INFO"

    # Limit the rate of calls to prevent abuse and unwanted charges
    throttling_rate_limit  = 100
    throttling_burst_limit = 50
  }
}

resource "aws_api_gateway_method" "getAllergyFlags" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_rest_api.allert_rest_api.root_resource_id
  rest_api_id   = aws_api_gateway_rest_api.allert_rest_api.id
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = aws_api_gateway_rest_api.allert_rest_api.id
  resource_id             = aws_api_gateway_rest_api.allert_rest_api.root_resource_id
  http_method             = aws_api_gateway_method.getAllergyFlags.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.ocr_lambda.invoke_arn
}
