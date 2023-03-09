"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockLevel = void 0;
const fs_1 = require("fs");
const getStockLevel = (sku) => __awaiter(void 0, void 0, void 0, function* () {
    const stockJson = yield fs_1.promises.readFile("./stock.json", "utf-8");
    const transactionsJson = yield fs_1.promises.readFile("./transactions.json", "utf-8");
    const stock = JSON.parse(stockJson);
    const transactions = JSON.parse(transactionsJson);
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
});
exports.getStockLevel = getStockLevel;
