import fetchers from "../../src/fetchers/index"
import { mockFetcherResponse, mockFetcherResponseWithFunction } from "./_helpers";

const pathToExampleResponse = "../../src/fetchers/trader-joe/example-response.json";
const expectedResult = [
  {
    "symbol": "WAVAX",
    "value": 43.748689396873296
  },
  {
    "symbol": "PNG",
    "value": 1.9297487513400018
  },
  {
    "symbol": "SNOB",
    "value": 1.1536966846113443
  },
  {
    "symbol": "SPORE",
    "value": 1.6207263003171588e-10
  },
  {
    "symbol": "XAVA",
    "value": 3.0202135734287623
  },
  {
    "symbol": "SHERPA",
    "value": 2.5500045276659677
  },
  {
    "symbol": "JOE",
    "value": 1.4411137463584196
  }
];

jest.mock("axios");

describe("trader-joe fetcher", () => {
  const sut = fetchers["trader-joe"];

  it("should properly fetch data", async () => {
    // Given
    mockFetcherResponse(pathToExampleResponse);

    // When
    const result = await sut.fetchAll(["WAVAX", "PNG", "SNOB", "SPORE", "XAVA", "SHERPA", "JOE"]);

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
    const result = await sut.fetchAll(["WAVAX", "PNG", "SNOB", "SPORE", "XAVA", "SHERPA", "JOE"]);

    // Then
    expect(result).toEqual(expectedResult);
    expect(tryCounter).toEqual(2);
  });
});
