import { getStockLevel } from "./stock";
import { promises as fs } from "fs";

describe("getStockLevel", () => {
  test("returns current stock level for existing SKU", async () => {
    const stock = { "ABC-123": 10, "DEF-456": 5 };
    const transactions = [
      { sku: "ABC-123", qty: -2 },
      { sku: "DEF-456", qty: 3 },
      { sku: "ABC-123", qty: 5 },
      { sku: "DEF-456", qty: -1 },
    ];

    jest
      .spyOn(fs, "readFile")
      .mockResolvedValueOnce(JSON.stringify(stock))
      .mockResolvedValueOnce(JSON.stringify(transactions));

    const stockLevel = await getStockLevel("ABC-123");
    expect(stockLevel).toEqual({ sku: "ABC-123", qty: 13 });
  });

  test("throws error for non-existent SKU", async () => {
    const stock = { "ABC-123": 10 };
    const transactions = [{ sku: "ABC-123", qty: -2 }];

    jest
      .spyOn(fs, "readFile")
      .mockResolvedValueOnce(JSON.stringify(stock))
      .mockResolvedValueOnce(JSON.stringify(transactions));

    await expect(getStockLevel("DEF-456")).rejects.toThrowError(
      "SKU DEF-456 not found in stock."
    );
  });
});
