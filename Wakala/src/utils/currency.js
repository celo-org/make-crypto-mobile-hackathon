// Currencylayer API to fetch currencies


/**
 * params walletBalance and currencyTicker
 * walletBalance is in cUSD and currency ticker eg:KES, CAD etc
 */
 export function currencyConverter(walletBalance, currencyTicker){
    const getCurrency = async () => {
        try {
          let response = await fetch(
            `http://api.currencylayer.com/live?access_key=ebe9e0e9dfc7625099a0fa08d5aac343&currencies=${currencyTicker}&format=1`
          );
          let json = await response.json();
          return json.quotes;
        } catch (error) {
           console.error(error);
        }
      };

    return walletBalance * getCurrency

}


