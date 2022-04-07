resource "aws_dynamodb_table" "allergen_table" {
  name           = "allergen_table"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "allergy"
  range_key      = "allergens"

  attribute {
    name = "allergy"
    type = "S"
  }

  attribute {
    name = "allergens"
    type = "S"
  }
}