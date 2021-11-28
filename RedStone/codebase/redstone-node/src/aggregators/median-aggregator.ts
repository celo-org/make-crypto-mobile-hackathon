import { Consola } from "consola";
import {
  Aggregator,
  PriceDataAfterAggregation,
  PriceDataBeforeAggregation,
} from "../types";

const logger =
  require("../utils/logger")("aggregators/median-aggregator") as Consola;

const medianAggregator: Aggregator = {
  getAggregatedValue(
    price: PriceDataBeforeAggregation,
    maxPriceDeviationPercent: number
  ): PriceDataAfterAggregation {
    const symbol = price.symbol;
    const validValues = Object.values(price.source).filter(v => !isNaN(v) && v > 0);
    if (validValues.length === 0) {
      throw new Error(`No valid values for symbol: ${price.symbol}`);
    }
    const initialMedian = getMedianValue(validValues);

    // Filtering out values based on deviation from the initial median
    const stableValues = [];
    for (const sourceName of Object.keys(price.source)) {
      const value = price.source[sourceName];
      const deviation =
        (Math.abs(value - initialMedian) / initialMedian) * 100;
      if (isNaN(value)) {
        // We don't log warnings for "error" values
        // because these values represent fetching fails
        // which should already be logged as warning
        if (value !== "error") {
          logger.warn(
            `Incorrect price value (NaN) for source: ${sourceName}. `
            + `Symbol: ${symbol}. Value: ${value}`, price);
        }
      } else if (value <= 0) {
        logger.warn(
          `Incorrect price value (<= 0) for source: ${sourceName}. `
          + `Symbol: ${symbol}. Value: ${value}`, price);
      } else if (deviation > maxPriceDeviationPercent) {
        logger.info(
          `Value ${value} has too big deviation for symbol: ${symbol} `
          + `and source: ${sourceName}. Deviation: (${deviation})%. `
          + `Skipping...`, price);
      } else {
        stableValues.push(value);
      }
    }

    if (stableValues.length === 0) {
      throw new Error(
        `All values have too big deviation for symbol: ${price.symbol}`);
    }

    return {
      ...price,
      value: getMedianValue(stableValues),
    };
  },
};

export function getMedianValue(arr: number[]): number {
  if (arr.length === 0) {
    throw new Error("Cannot get median value of an empty array");
  }

  arr = arr.sort((a, b) => a - b);

  const middle = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    return (arr[middle] + arr[middle - 1]) / 2;
  } else {
    return arr[middle];
  }
}

export default medianAggregator;
