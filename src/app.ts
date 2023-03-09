import express from "express";
import { getStockLevel } from "./stock";

const app = express();
app.use(express.json());

app.get("/stock/:sku", async (req, res) => {
  const { sku } = req.params;

  try {
    const stockLevel = await getStockLevel(sku);
    res.status(200).json(stockLevel);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
