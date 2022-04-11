resource "aws_sfn_state_machine" "allert_step_function" {
  name       = "allert_step_function"
  role_arn   = aws_iam_role.step_function_role.arn
  type       = "EXPRESS"
  definition = <<EOF
{
   "Comment":"Allert State Machine",
   "StartAt":"post_proc_lambda",
   "States":{
      "post_proc_lambda":{
         "Type":"Task",
         "Resource":"arn:aws:lambda:eu-west-1:260350295037:function:post_proc_lambda",
         "Next":"dynamodb_lambda"
      },
      "dynamodb_lambda":{
         "Type":"Task",
         "Resource":"arn:aws:lambda:eu-west-1:260350295037:function:dynamodb_lambda",
         "Next":"match_allergens_lambda"
      },
      "match_allergens_lambda":{
         "Type":"Task",
         "Resource":"arn:aws:lambda:eu-west-1:260350295037:function:match_allergens_lambda",
         "End":true
      }
   }
}
    EOF
  logging_configuration {
    log_destination        = "${aws_cloudwatch_log_group.step_function_log_group.arn}:*"
    include_execution_data = true
    level                  = "ALL"
  }
}