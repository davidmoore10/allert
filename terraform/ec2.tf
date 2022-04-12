data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }
}

resource "aws_instance" "docker_ec2" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = "t2.micro"
  vpc_security_group_ids = ["${aws_security_group.docker_ec2_sg.id}"]
  key_name               = "docker_ec2_key"

  tags = {
    "Name" = "docker_ec2"
  }
}