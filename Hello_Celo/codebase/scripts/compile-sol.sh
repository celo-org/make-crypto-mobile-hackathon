#!/bin/bash

docker run -v $(pwd):/sources ethereum/solc:0.6.12 -o /sources/output --overwrite --abi --bin /sources/hello-celo.sol
