# ---------------------------------------------------------------------------------------------------------------------
# PARAMETERS
# These parameters have reasonable defaults.
# ---------------------------------------------------------------------------------------------------------------------
variable "create_vpc" {
  description = "Controls if VPC should be created (it affects almost all resources)"
  type        = bool
  default     = true
}

variable "aws_profile_name" {
  description = "AWS Account id that is configured locally"
  type        = string
}

variable "ec2_ami_search_string" {
  description = "AWS AMI to be used as default for all AWS EC2 instances"
  type        = string
}

variable "ami_id" {
  description = "AMI-ID to be used to deploy MongoDB Instance (Default: Ubuntu 20.04)"
  type        = string
  default     = "ami-05c8397776f8e67d1"
}

variable "name" {
  type        = string
  description = "The name of the resources"
  default     = "near-poc-vpc"
}

variable "region" {
  type        = string
  description = "The name of the region you wish to deploy into"
  default     = "us-east-1"
}

variable "api_instance_type" {
  type        = string
  description = "AWS instance type to use for new MongodDB instance"
  default     = "t2.medium"
}

variable "instance_key" {
  type        = string
  description = "SSH Key file to login to AWS instance. Should be created manually on AWS key pairs before hand"
}

variable "tags" {
  #type        = map(string)
  default     = {}
  description = "tags, which could be used for additional tags"
}

variable "private_subnet_tags" {
  description = "Additional tags for the private subnets"
  type        = map(string)
  default     = {}
}

variable "public_subnet_tags" {
  description = "Additional tags for the public subnets"
  type        = map(string)
  default     = {}
}

variable "enable_dns_hostnames" {
  description = "Should be true to enable DNS hostnames in the VPC"
  type        = bool
  default     = true
}

variable "enable_dns_support" {
  description = "Should be true to enable DNS support in the VPC"
  type        = bool
  default     = true
}

variable "instance_tenancy" {
  description = "A tenancy option for instances launched into the VPC"
  type        = string
  default     = "default"
}

variable "cidr" {
  description = "The CIDR block for the VPC. Default value is a valid CIDR, but not acceptable by AWS and should be overridden"
  type        = string
  default     = "11.0.0.0/16"
}

variable "public_subnets" {
  description = "A list of private subnets inside the VPC"
  type        = list(string)
  #  default     = ["11.0.128.0/20", "11.0.144.0/20", "11.0.160.0/20", "11.0.176.0/20", "11.0.240.0/22", "11.0.244.0/22"]
}

variable "private_subnets_A" {
  description = "A list of private subnets inside the VPC"
  type        = list(string)
  #  default     = ["11.0.0.0/19", "11.0.32.0/19", "11.0.64.0/19", "11.0.96.0/19", "11.0.232.0/22", "11.0.236.0/22"]
}

variable "private_subnets_B" {
  description = "A list of private subnets inside the VPC"
  type        = list(string)
  #  default     = ["11.0.192.0/21", "11.0.200.0/21", "11.0.208.0/21", "11.0.216.0/21", "11.0.224.0/22", "11.0.228.0/22"]
}

variable "public_inbound_acl_rules" {
  description = "Public subnets inbound network ACLs"
  type        = list(map(string))

  default = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
}

variable "public_outbound_acl_rules" {
  description = "Public subnets outbound network ACLs"
  type        = list(map(string))

  default = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
}

variable "custom_inbound_acl_rules" {
  description = "Custom subnets inbound network ACLs"
  type        = list(map(string))

  default = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
}

variable "custom_outbound_acl_rules" {
  description = "Custom subnets outbound network ACLs"
  type        = list(map(string))

  default = [
    {
      rule_number = 100
      rule_action = "allow"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_block  = "0.0.0.0/0"
    },
  ]
}

variable "elastic_ips" {
  description = "A list of Elastic IP Addresses to attach to instances"
  type        = list(string)
}
