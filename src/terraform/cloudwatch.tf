resource "aws_cloudwatch_log_group" "step_function_log_group" {
  name = "step_function_log_group"
}

resource "aws_cloudwatch_log_group" "api_gateway_log_group" {
  name = "api_gateway_log_group"
}