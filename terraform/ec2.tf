resource "aws_instance" "test_ec2" {
  ami           = "ami-00ae935ce6c2aa534"
  instance_type = "t2.micro"
  key_name      = "test_pair"

  tags = {
    Name = "TestEC2Instance"
  }
}