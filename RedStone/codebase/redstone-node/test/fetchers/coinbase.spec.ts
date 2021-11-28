import fetchers from "../../src/fetchers/index"

jest.mock('../../src/fetchers/coinbase/CoinbaseProxy', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getExchangeRates: () => {
        const exampleResponse = require("../../src/fetchers/coinbase/example-response.json");
        return Promise.resolve({
          data: exampleResponse
        });
      }
    }
  });
});

describe("coinbase fetcher", () => {
  const sut = fetchers["coinbase"];

  it('should properly fetch data', async () => {
    //given

    //when
    const result = await sut.fetchAll(["AR", "ETH", "BTC"]);

    //then
    expect(result).toEqual([
      {
        "symbol": "ETH",
        "value": 2433.31,
      },
      {
        "symbol": "BTC",
        "value": 36979.855,
      }
    ]);

  });
});

