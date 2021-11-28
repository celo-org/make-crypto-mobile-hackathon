import fetchers from "../../src/fetchers/index"
import { mockFetcherResponse, mockFetcherResponseWithFunction } from "./_helpers";

const pathToExampleResponse = "../../src/fetchers/uniswap/example-response.json";
const expectedResult = [
  {
    "symbol": "CREAM",
    "value": 164.73043095163868
  },
  {
    "symbol": "SAND",
    "value": 1.043162053163669
  },
  {
    "symbol": "YFI",
    "value": 37730.70165985392
  },
  {
    "symbol": "KP3R",
    "value": 289.0442359730218
  },
  {
    "symbol": "XOR",
    "value": 290.10178576836563
  }
];

jest.mock("axios");

describe("uniswap fetcher", () => {
  const sut = fetchers["uniswap"];

  it("should properly fetch data", async () => {
    // Given
    mockFetcherResponse(pathToExampleResponse);

    // When
    const result = await sut.fetchAll(["CREAM", "SAND", "YFI", "KP3R", "XOR"]);

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
    const result = await sut.fetchAll(["CREAM", "SAND", "YFI", "KP3R", "XOR"]);

    // Then
    expect(result).toEqual(expectedResult);
    expect(tryCounter).toEqual(2);
  });
});
