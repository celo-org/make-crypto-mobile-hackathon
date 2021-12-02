# hello-celo


## Building Smart Contract

`cd smart-contracts`

`docker run -v $(pwd):/sources ethereum/solc:stable -o /sources/output --abi --bin /sources/hello-celo.sol`

using web3j v1.4.1

`~/Development/web3j-1.4.1/bin/web3j generate solidity --abiFile=./output/HelloWorld.abi --binFile=./output/HelloWorld.bin --outputDir=../android/domain/src/main/java/ --package=com.github.browep.hellocelo`
