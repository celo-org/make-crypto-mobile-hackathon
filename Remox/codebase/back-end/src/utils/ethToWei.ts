export function ethToWei(num: string): String {
    let result: string;
    let parse: string;
    if (num.includes(",")) {
        const splitedNum = num.split(",")

        if (splitedNum[1].length > 8) {

            let anotherPartArr = [...splitedNum[1]]
            anotherPartArr.splice(8, 0, ",")
            let updatedArr = anotherPartArr.join("").split(",");
            parse = parseInt(splitedNum[0] + updatedArr[0]).toString()
            updatedArr[0] = parse;
            result = updatedArr.join(",")

        } else if (splitedNum[1].length < 8) {

            let zeroCount = 8 - splitedNum[1].length;
            parse = parseInt(splitedNum.join("")).toString()
            result = parse + String().padEnd(zeroCount, "0")

        } else {

            result = parseInt(splitedNum.join("")).toString()
        }
    } else {
        result = num + "00000000"
    }
    return result
}

 // let block = await this.kit.web3.eth.getBlock("latest",true);
            // // for (var i =9413629-1 ; i <= 9413629; i++) {
            //   if (block != null && block.transactions != null) {
            //     block.transactions.forEach( function(e) {
            //         console.log(e.to)
            //       if (account.address == e.to) {
            //         console.log("  tx hash          : " + e.hash + "\n"
            //           + "   nonce           : " + e.nonce + "\n"
            //           + "   blockHash       : " + e.blockHash + "\n"
            //           + "   blockNumber     : " + e.blockNumber + "\n"
            //           + "   transactionIndex: " + e.transactionIndex + "\n"
            //           + "   from            : " + e.from + "\n" 
            //           + "   to              : " + e.to + "\n"
            //           + "   value           : " + e.value + "\n"
            //           + "   gasPrice        : " + e.gasPrice + "\n"
            //           + "   gas             : " + e.gas + "\n"
            //           + "   input           : " + e.input);
            //       }
            //     })
            // //   }
            // }