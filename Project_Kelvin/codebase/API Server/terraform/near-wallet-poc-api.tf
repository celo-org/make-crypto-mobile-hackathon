###################################
#near_poc API Server Compute Instance#
###################################

data "aws_ami_ids" "ubuntu" {
  owners = ["099720109477"]

  filter {
    name   = "name"
    values = [ var.ec2_ami_search_string ]
  }
}

// near_poc API Host Security Group
resource "aws_security_group" "near_poc-api" {
  name   = "SG+${var.name}_API"
  count  = var.create_vpc == true ? 1 : 0
  vpc_id = aws_vpc.vpc_private_network[count.index].id
  ingress {
    from_port   = 22
    protocol    = "TCP"
    to_port     = 22
    cidr_blocks = ["202.133.212.198/32"]
    description = "SSH Access from Prasad Desktop"
  }
  ingress {
    from_port   = 22
    protocol    = "TCP"
    to_port     = 22
    cidr_blocks = ["207.38.250.248/32"]
    description = "SSH Access from Basanth Desktop"
  }
  ingress {
    from_port   = 22
    protocol    = "TCP"
    to_port     = 22
    cidr_blocks = ["96.95.210.225/32", "74.213.250.214/32", "173.46.67.114/32"]
    description = "SSH Access from Girish Desktop"
  }
  ingress {
    from_port        = 443
    to_port          = 443
    protocol         = "TCP"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
    description      = "HTTPS Public Access"
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
    description      = "World Read"
  }
  tags = merge(
    var.tags,
    {
      Name : "SG+${var.name}_near_poc_API"
    }
  )
}

resource "aws_ebs_volume" "ec2_near_poc_api_data" {
  availability_zone = aws_subnet.private_A[0].availability_zone
  size              = 40
  encrypted         = false
  tags = merge(
    var.tags,
    {
      Name : "VOL+${var.name}_near_poc_api-data"
    }
  )

}

resource "aws_volume_attachment" "ec2_near_poc_api_data" {
  count        = var.create_vpc == true ? 1 : 0
  device_name  = "/dev/xvdb"
  instance_id  = aws_instance.ec2_near_poc_api[count.index].id
  volume_id    = aws_ebs_volume.ec2_near_poc_api_data.id
  force_detach = true
}

// near_poc API Host Instance
resource "aws_instance" "ec2_near_poc_api" {
  count             = var.create_vpc == true ? 1 : 0
  ami               = var.ami_id
  instance_type     = var.api_instance_type
  key_name          = var.instance_key
  subnet_id         = aws_subnet.public[0].id
  availability_zone = aws_subnet.public[0].availability_zone
  tenancy           = "default"
  ebs_optimized     = true
  vpc_security_group_ids = [
    aws_security_group.near_poc-api[count.index].id
  ]
  monitoring = false

  root_block_device {
    volume_size           = 12
    volume_type           = "gp2"
    delete_on_termination = true
  }
  source_dest_check = true
  tags = merge(
    var.tags,
    {
      Name : "EC2+${var.name}_api"
    }
  )
}
