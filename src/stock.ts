import { promises as fs } from "fs";

type Stock = {
  [key: string]: number;
};

type Transaction = {
  sku: string;
  qty: number;
};

export const getStockLevel = async (
  sku: string
): Promise<{ sku: string; qty: number }> => {
  const stockJson = await fs.readFile("./stock.json", "utf-8");

  const transactionsJson = await fs.readFile("./transactions.json", "utf-8");

  const stock: Stock = JSON.parse(stockJson);
  const transactions: Transaction[] = JSON.parse(transactionsJson);

  if (!stock[sku]) {
    throw Error(`SKU ${sku} not found in stock.`);
  }

  let currentStock = stock[sku];

  for (const transaction of transactions) {
    if (transaction.sku === sku) {
      currentStock += transaction.qty;
    }
  }

  return { sku, qty: currentStock };
};
