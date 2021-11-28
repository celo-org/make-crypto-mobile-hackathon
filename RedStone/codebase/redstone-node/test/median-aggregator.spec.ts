import { PriceDataAfterAggregation, PriceDataBeforeAggregation } from "../src/types";
import medianAggregator, { getMedianValue } from "../src/aggregators/median-aggregator";

describe('getMedianValue', () => {
  it('should throw for empty array', () => {
    expect(() => getMedianValue([])).toThrow();
  });

  it('should properly calculate median for odd number of elements', () => {
    expect(getMedianValue([3, 7, 2, 6, 5, 4, 9])).toEqual(5);
    expect(getMedianValue([-3, 0, 3])).toEqual(0);
    expect(getMedianValue([3, 0, -3])).toEqual(0);
    expect(getMedianValue([-7, -5, -11, -4, -8])).toEqual(-7);
  });

  it('should properly calculate median for even number of elements', () => {
    expect(getMedianValue([3, 7, 2, 6, 5, 4])).toEqual(4.5);
    expect(getMedianValue([-3, 0])).toEqual(-1.5);
    expect(getMedianValue([0, -3])).toEqual(-1.5);
    expect(getMedianValue([-7, -5, -4, -8])).toEqual(-6);
  });
});

describe('medianAggregator', () => {
  it('should properly aggregate prices from different sources', () => {
    // Given
    const input: PriceDataBeforeAggregation = {
      id: "",
      source: {
        "src1": 3,
        "src2": 7,
        "src3": 2,
        "src4": 6,
        "src5": 5,
        "src6": 9,
        "src7": 8
      },
      symbol: "BTC",
      timestamp: 0,
      version: ""
    };

    // When
    const result: PriceDataAfterAggregation = medianAggregator.getAggregatedValue(input, 25);

    // Then
    expect(result.value).toEqual(6);
  });

  it('should throw if all price values deviate too much from median', () => {
    // Given
    const input: PriceDataBeforeAggregation = {
      id: "",
      source: {
        "src1": 555,
        "src2": 0,
        "src3": 12312312.3,
        "src4": 89.3334,
        "src5": -1,
        "src6": -0.0000000001,
        "src7": 0.0000000001
      },
      symbol: "BTC",
      timestamp: 0,
      version: ""
    };

    // Then
    expect(() => medianAggregator.getAggregatedValue(input, 25)).toThrow("All values have too big deviation for symbol: BTC");
  });

  it('should filter prices that deviate too much from the median value', () => {
    // Given
    const input: PriceDataBeforeAggregation = {
      id: "",
      source: {
        "src1": 74,
        "src2": 80,
        "src3": 90,
        "src4": 100,
        "src5": 110,
        "src6": 120,
        "src7": 124
      },
      symbol: "BTC",
      timestamp: 0,
      version: ""
    };

    // When
    const result: PriceDataAfterAggregation = medianAggregator.getAggregatedValue(input, 25);

    // Then
    expect(result.value).toEqual((100 + 110) / 2);
  });

  it('should keep all prices for all sources', () => {
    // Given
    const input: PriceDataBeforeAggregation = {
      id: "",
      source: {
        "src1": 0,
        "src2": null,
        "src3": 110,
        "src4": "error",
        "src5": undefined,
        "src6": 100,
        "src7": 120,
      },
      symbol: "BTC",
      timestamp: 0,
      version: ""
    };

    // When
    const result: PriceDataAfterAggregation = medianAggregator.getAggregatedValue(input, 25);

    // Then
    expect(result.value).toEqual(110);
    expect(result.source).toEqual(input.source);
  });
});
