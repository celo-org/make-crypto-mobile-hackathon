import PricesService, {
  PricesBeforeAggregation,
  PricesDataFetched,
} from "../src/fetchers/PricesService";

// Having hard time to mock uuid..so far only this solution is working: https://stackoverflow.com/a/61150430
jest.mock("uuid",
  () => ({ v4: () => "00000000-0000-0000-0000-000000000000" }));

describe("groupPricesByToken", () => {
  const fetchTimestamp = 555;
  const nodeVersion = "3";

  it("should assign values from different sources to tokens/symbols", () => {
    // Given
    const pricesData: PricesDataFetched = {
      "src1": [
        {"symbol": "BTC", value: 444},
        {"symbol": "ETH", value: 222},
        {"symbol": "DOGE", value: 111}
      ],
      "src2": [
        {"symbol": "BTC", value: 444.2},
        {"symbol": "ETH", value: 222.5}
      ],
      "src3": [
        {"symbol": "DOGE", value: 107.4},
        {"symbol": "ETH", value: "error"}
      ]
    }

    // When
    const result: PricesBeforeAggregation = PricesService.groupPricesByToken(
      fetchTimestamp, pricesData, nodeVersion);

    // Then
    expect(result).toEqual({
      "BTC": {
        "id": "00000000-0000-0000-0000-000000000000",
        "source": {
          "src1": 444,
          "src2": 444.2,
        },
        "symbol": "BTC",
        "timestamp": 555,
        "version": "3",
      },
      "DOGE": {
        "id": "00000000-0000-0000-0000-000000000000",
        "source": {
          "src1": 111,
          "src3": 107.4,
        },
        "symbol": "DOGE",
        "timestamp": 555,
        "version": "3",
      },
      "ETH": {
        "id": "00000000-0000-0000-0000-000000000000",
        "source": {
          "src1": 222,
          "src2": 222.5,
          "src3": "error",
        },
        "symbol": "ETH",
        "timestamp": 555,
        "version": "3",
      },
    });
  });
});

describe("fetchInParrallel", () => {

  it("Should correctly fetch from sources", async () => {
    // Given
    const manifest = {
      defaultSource: ["mock"],
      interval: 10000,
      maxPriceDeviationPercent: 25,
      priceAggregator: "median",
      sourceTimeout: 2000,
      evmChainId: 1,
      tokens: {}
    };
    const credentials = { "ethereumPrivateKey": "0x0" };
    const priceService = new PricesService(manifest, credentials);
    priceService.doFetchFromSource = async (source: string, tokens: string[]) => {
      if (source.includes("bad")) {
        throw new Error("test-error");
      } else {
        return tokens.map(symbol => ({ symbol, value: 1 }));
      }
    };

    // When
    const result: PricesDataFetched[] = await priceService.fetchInParallel({
      "good-src-1": ["BTC", "ETH"],
      "good-src-2": ["BTC", "DAI"],
      "bad-src": ["DAI", "USDT"],
    });

    // Then
    expect(result).toEqual([
      {
        "good-src-1": [
          {
            "symbol": "BTC",
            "value": 1
          },
          {
            "symbol": "ETH",
            "value": 1
          }
        ]
      },
      {
        "good-src-2": [
          {
            "symbol": "BTC",
            "value": 1
          },
          {
            "symbol": "DAI",
            "value": 1
          }
        ]
      },
      {
        "bad-src": [
          {
            "symbol": "DAI",
            "value": "error"
          },
          {
            "symbol": "USDT",
            "value": "error"
          }
        ]
      }
    ]);
  });
});
