resource "aws_iam_role" "lambda_role" {
  name               = "lambda_role"
  assume_role_policy = file("iam_roles/lambda_role.json")
}

resource "aws_iam_policy" "lambda_policy" {
  name   = "lambda_policy"
  policy = file("iam_policies/lambda_policy.json")
}

resource "aws_iam_role_policy_attachment" "lambda_role_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_iam_role" "step_function_role" {
  name               = "step_function_role"
  assume_role_policy = file("iam_roles/step_function_role.json")
}

resource "aws_iam_policy" "step_function_policy" {
  name   = "step_function_policy"
  policy = file("iam_policies/step_function_policy.json")
}

resource "aws_iam_role_policy_attachment" "step_function_role_policy_attachment" {
  role       = aws_iam_role.step_function_role.name
  policy_arn = aws_iam_policy.step_function_policy.arn
}

resource "aws_iam_role" "apigw_role" {
  name               = "apigw_role"
  assume_role_policy = file("iam_roles/apigw_role.json")
}

resource "aws_iam_policy" "apigw_policy" {
  name   = "apigw_policy"
  policy = file("iam_policies/apigw_policy.json")
}