import ManifestHelper from "../src/manifest/ManifestParser";
import {Manifest} from "../src/types";

describe("groupTokenBySource", () => {
  const baseManifest = {
    interval: 2000,
    priceAggregator: "median",
    sourceTimeout: 3000,
    maxPriceDeviationPercent: 25,
    evmChainId: 1,
  };

  it("should properly assign tokens to sources", () => {
    //given
    const manifest: Manifest = {
      ...baseManifest,
      tokens: {
        "BTC": {
          "source": [
            "bitfinex",
            "ftx"
          ]
        },
        "ETH": {
          "source": [
            "binance",
            "bitfinex"
          ]
        },
        "USDT": {
          "source": [
            "ftx",
            "binance"
          ]
        }
      }
    };

    //when
    const result = ManifestHelper.groupTokensBySource(manifest);

    //then
    expect(result).toEqual({
      "bitfinex": ["BTC", "ETH"],
      "ftx": ["BTC", "USDT"],
      "binance": ["ETH", "USDT"]
    });
  });

  it("should use default source, if no source for given token is defined", () => {
    //given
    const manifest: Manifest = {
      ...baseManifest,
      defaultSource: ["kraken"],
      tokens: {
        "BTC": {
          "source": [
            "bitfinex",
            "ftx"
          ]
        },
        "ETH": {},
        "USDT": {
          "source": [
            "ftx"
          ]
        }
      }
    };

    //when
    const result = ManifestHelper.groupTokensBySource(manifest);

    //then
    expect(result).toEqual({
      "bitfinex": ["BTC"],
      "kraken": ["ETH"],
      "ftx": ["BTC", "USDT"]
    });
  });

  it("should use default source if token has defined empty source", () => {
    //given
    const manifest: Manifest = {
      ...baseManifest,
      defaultSource: ["kraken"],
      tokens: {
        "BTC": {
          "source": [
            "bitfinex",
            "ftx"
          ]
        },
        "ETH": {
          "source": []
        },
        "USDT": {
          "source": [
            "ftx"
          ]
        }
      }
    };

    //when
    const result = ManifestHelper.groupTokensBySource(manifest);

    //then
    expect(result).toEqual({
      "bitfinex": ["BTC"],
      "kraken": ["ETH"],
      "ftx": ["BTC", "USDT"]
    });
  });

  it("should throw error if neither source for token nor default source are defined", () => {
    //given
    const manifest: Manifest = {
      ...baseManifest,
      tokens: {
        "ETH": {},
        "USDT": {
          "source": [
            "ftx"
          ]
        }
      }
    };
    //when

    //then
    expect(() => ManifestHelper.groupTokensBySource(manifest)).toThrow(/global source is not defined/);
  });
});

describe("getTimeoutForSource", () => {
  const baseManifest = {
    interval: 2000,
    priceAggregator: "median",
    maxPriceDeviationPercent: 25,
    evmChainId: 1,
    tokens: {
      "BTC": {
        "source": [
          "bitfinex",
          "ftx"
        ]
      }
    }
  }

  it("should throw if source is empty", () => {
    //given
    const manifest: Manifest = {
      ...baseManifest,
      sourceTimeout: 5000,
    };

    expect(() => ManifestHelper.getTimeoutForSource("", manifest)).toThrow();
  });

  it("should use default timeout (simple notation)", () => {
    //given
    const manifest: Manifest = {
      ...baseManifest,
      sourceTimeout: 5000,
    };

    //then
    expect(ManifestHelper.getTimeoutForSource("ftx", manifest)).toEqual(5000);
    expect(ManifestHelper.getTimeoutForSource("binance", manifest)).toEqual(5000);
    expect(ManifestHelper.getTimeoutForSource("bitfinex", manifest)).toEqual(5000);
  });

  it("should return null sourceTimeout is not a number", () => {
    //given
    const manifest: any = {
      ...baseManifest,
      sourceTimeout: "5s",
    };

    //then
    expect(ManifestHelper.getTimeoutForSource("ftx", manifest)).toBeNull();
  });

});

describe("getMaxDeviationForSymbol", () => {
  const baseManifest = {
    interval: 2000,
    priceAggregator: "median",
    sourceTimeout: 5000
  }

  it("should get default value, if no value for token available", () => {
    //given
    const manifest = {
      ...baseManifest,
      maxPriceDeviationPercent: 15,
      evmChainId: 1,
      tokens: {
        "BTC": {},
        "ETH": {},
        "USDT": {
          maxPriceDeviationPercent: 5
        }
      }
    }

    //then
    expect(ManifestHelper.getMaxDeviationForSymbol("BTC", manifest)).toEqual(15);
    expect(ManifestHelper.getMaxDeviationForSymbol("ETH", manifest)).toEqual(15);
    expect(ManifestHelper.getMaxDeviationForSymbol("USDT", manifest)).toEqual(5);
  });

  it("should get value specific for token if available", () => {
    //given
    const manifest = {
      ...baseManifest,
      maxPriceDeviationPercent: 15,
      evmChainId: 1,
      tokens: {
        "BTC": {
          maxPriceDeviationPercent: 34
        },
        "ETH": {
          maxPriceDeviationPercent: 23
        },
        "USDT": {
          maxPriceDeviationPercent: 5
        }
      }
    }

    //then
    expect(ManifestHelper.getMaxDeviationForSymbol("BTC", manifest)).toEqual(34);
    expect(ManifestHelper.getMaxDeviationForSymbol("ETH", manifest)).toEqual(23);
    expect(ManifestHelper.getMaxDeviationForSymbol("USDT", manifest)).toEqual(5);
  });

  it("should return null if checking for unknown token", () => {
    //given
    const manifest = {
      ...baseManifest,
      maxPriceDeviationPercent: 15,
      evmChainId: 1,
      tokens: {
        "BTC": {
          maxPriceDeviationPercent: 34
        },
        "ETH": {
          maxPriceDeviationPercent: 23
        },
        "USDT": {
          maxPriceDeviationPercent: 5
        }
      }
    }

    //then
    expect(ManifestHelper.getMaxDeviationForSymbol("DOGE", manifest)).toBeNull();
    expect(ManifestHelper.getMaxDeviationForSymbol("USD", manifest)).toBeNull();
    expect(ManifestHelper.getMaxDeviationForSymbol("UNI", manifest)).toBeNull();
  });

  it("should return undefined if checking for unknown token", () => {
    //given
    const manifest = JSON.parse(`{
      "interval": 2000,
      "priceAggregator": "median",
      "sourceTimeout": 5000,
      "maxPriceDeviationPercent": "5m",
      "evmChainId": 1,
      "tokens": {
        "BTC": {
          "maxPriceDeviationPercent": 34
        },
        "ETH": {
          "maxPriceDeviationPercent": "2m"
        },
        "USDT": {
        }
      }
    }`);

    //then
    expect(ManifestHelper.getMaxDeviationForSymbol("ETH", manifest)).toBeNull();
    expect(ManifestHelper.getMaxDeviationForSymbol("USDT", manifest)).toBeNull();
  });
});
