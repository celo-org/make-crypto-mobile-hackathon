import fetchers from "../../src/fetchers/index"

jest.mock('ecb-euro-exchange-rates', () => {
  return {
    fetch: () => {
      return Promise.resolve(require("../../src/fetchers/ecb/example-response.json"));
    }
  }
});

describe("ecb fetcher", () => {
  const sut = fetchers["ecb"];

  it('should properly fetch data', async () => {
    //given

    //when
    const result = await sut.fetchAll(["EUR", "JPY", "GBP"]);

    //then
    expect(result).toEqual([
      {
        "symbol": "EUR",
        "value": 1.2198
      },
      {
        "symbol": "JPY",
        "value": 0.009142557337730476
      },
      {
        "symbol": "GBP",
        "value": 1.4172514755774506
      }
    ]);
  });
});
