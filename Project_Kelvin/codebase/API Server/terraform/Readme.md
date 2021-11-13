
Inspired from following:

# Setup VPC 
https://github.com/aws-quickstart/terraform-aws-vpc

https://github.com/aws-quickstart/quickstart-aws-vpc

# Prerequisites

#####create local aws credential profile 

Example: sample-aws-account) => https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

#####create a ssh keypair locally and import in aws console
create ssh key pair
```shell
> ssh-keygen -t rsa -b 4096 -f near-wallet-key-pair
> ls 
  near-wallet-key
  near-wallet-key.pub
``` 

import keypair in aws console 
=> https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#how-to-generate-your-own-key-and-import-it-to-aws

# Setup infrastructure
  run terraform apply to setup infrastructure 
  
  terraform apply -var-file=near-wallet-poc-app.tfvars -var aws_profile_name=sample-aws-account