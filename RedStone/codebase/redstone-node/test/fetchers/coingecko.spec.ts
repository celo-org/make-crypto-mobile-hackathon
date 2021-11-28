import fetchers from "../../src/fetchers/index"

jest.mock("../../src/fetchers/coingecko/CoingeckoProxy", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getExchangeRates: () => {
        const exampleResponse = require("../../src/fetchers/coingecko/example-response.json");

        return Promise.resolve({
          data: exampleResponse
        });
      }
    }
  });
});

describe("coingecko fetcher", () => {
  const sut = fetchers["coingecko"];

  it('should properly fetch data', async () => {
    // Given

    // When
    const result = await sut.fetchAll(["BTC", "ETH", "AR"]);

    // Then
    expect(result).toEqual([
      {
        "symbol": "BTC",
        "value": 38190,
      },
      {
        "symbol": "ETH",
        "value": 2704.39,
      },
      {
        "symbol": "AR",
        "value": 17.46,
      }
    ]);

  });
});

