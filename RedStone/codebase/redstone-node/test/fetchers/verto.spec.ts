import axios from "axios";
import fetchers from "../../src/fetchers/index"
import { mockFetcherResponse, mockRedstoneApiPrice } from "./_helpers";

jest.mock("axios");
mockRedstoneApiPrice(10, "AR");

describe("verto fetcher", () => {
  const sut = fetchers["verto"];

  beforeEach(() => {
    mockFetcherResponse("../../src/fetchers/verto/example-response.json");
  });

  it("should properly fetch data", async () => {
    // Given

    // When
    const result = await sut.fetchAll(["XYZ"]);

    // Then
    expect(result).toEqual([
      {
        "symbol": "XYZ",
        "value": 2.5
      }
    ]);
  });
});
