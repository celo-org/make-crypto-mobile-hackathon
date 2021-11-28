import axios from "axios";
import fetchers from "../../src/fetchers/index"
import { mockFetcherResponse, mockRedstoneApiPrice } from "./_helpers";

jest.mock("axios");
mockRedstoneApiPrice(2500, "ETH");

describe("kyber fetcher", () => {
  const sut = fetchers["kyber"];

  beforeEach(() => {
    mockFetcherResponse("../../src/fetchers/kyber/example-response.json");
  });

  it("should properly fetch data", async () => {
    // Given

    // When
    const result = await sut.fetchAll(["MKR", "UNI", "SUSHI"]);

    // Then
    expect(result).toEqual([
      {
        "symbol": "MKR",
        "value": 3387.053316881745
      },
      {
        "symbol": "UNI",
        "value": 25.728675847614895
      },
      {
        "symbol": "SUSHI",
        "value": 11.281276604715393
      }
    ]);
  });
});
