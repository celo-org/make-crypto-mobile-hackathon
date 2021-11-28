import fetchers from "../../src/fetchers/index"
import { mockFetcherResponse, mockFetcherResponseWithFunction } from "./_helpers";

const pathToExampleResponse = "../../src/fetchers/sushiswap/example-response.json";
const expectedResult = [
  {
    "symbol": "CREAM",
    "value": 162.29924837765495
  },
  {
    "symbol": "UMA",
    "value": 12.810977172957678
  }
];

jest.mock("axios");

describe("sushiswap fetcher", () => {
  const sut = fetchers["sushiswap"];

  it("should properly fetch data", async () => {
    // Given
    mockFetcherResponse(pathToExampleResponse);

    // When
    const result = await sut.fetchAll(["CREAM", "UMA"]);

    // Then
    expect(result).toEqual(expectedResult);
  });

  it ("should retry data fetching", async () => {
    // Given
    const exampleResponse = require(pathToExampleResponse);
    let tryCounter = 0;
    const getResponse = () => {
      tryCounter++;
      if (tryCounter > 1) {
        return exampleResponse;
      } else {
        return undefined;
      }
    }
    mockFetcherResponseWithFunction(getResponse);

    // When
    const result = await sut.fetchAll(["CREAM", "UMA"]);

    // Then
    expect(result).toEqual(expectedResult);
    expect(tryCounter).toEqual(2);
  });
});
