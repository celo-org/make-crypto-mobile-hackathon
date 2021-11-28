import fetchers from "../../src/fetchers/index";

jest.mock("../../src/fetchers/yf-unofficial/YahooFinanceProxy", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getExchangeRates: () => {
        const exampleResponse = require("../../src/fetchers/yf-unofficial/example-response.json");

        return Promise.resolve(exampleResponse);
      }
    }
  });
});

describe("yf-unofficial fetcher", () => {
  const sut = fetchers["yf-unofficial"];


  it('should properly fetch data', async () => {
    // Given

    // When
    const result = await sut.fetchAll(["TSLA", "AMZN", "GOOG", "IBM", "AAPL","USDMXN=X","USDBRL=X","USDCOP=X","USDARS=X","USDPEN=X"]);
    console.log(result);

    // Then
    expect(result).toEqual([
      {
        "symbol": "TSLA",
        "value": 619.13
      },
      {
        "symbol": "AMZN",
        "value": 3265.16
      },
      {
        "symbol": "GOOG",
        "value": 2433.53
      },
      {
        "symbol": "IBM",
        "value": 143.38
      },
      {
        "symbol": "AAPL",
        "value": 126.85
      },
      {
        "symbol": "USDMXN=X",
        "value": 20.317
      },
      {
        "symbol": "USDBRL=X",
        "value": 5.5134
      },
      {
        "symbol": "USDCOP=X",
        "value": 3870.03
      },
      {
        "symbol": "USDARS=X",
        "value": 99.9
      },
      {
        "symbol": "USDPEN=X",
        "value": 4.0023
      }
    ]);
  });
});
