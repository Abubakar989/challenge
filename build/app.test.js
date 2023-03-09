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
const stock_1 = require("./stock");
const fs_1 = require("fs");
describe("getStockLevel", () => {
    test("returns current stock level for existing SKU", () => __awaiter(void 0, void 0, void 0, function* () {
        const stock = { "ABC-123": 10, "DEF-456": 5 };
        const transactions = [
            { sku: "ABC-123", qty: -2 },
            { sku: "DEF-456", qty: 3 },
            { sku: "ABC-123", qty: 5 },
            { sku: "DEF-456", qty: -1 },
        ];
        jest
            .spyOn(fs_1.promises, "readFile")
            .mockResolvedValueOnce(JSON.stringify(stock))
            .mockResolvedValueOnce(JSON.stringify(transactions));
        const stockLevel = yield (0, stock_1.getStockLevel)("ABC-123");
        expect(stockLevel).toEqual({ sku: "ABC-123", qty: 13 });
    }));
    test("throws error for non-existent SKU", () => __awaiter(void 0, void 0, void 0, function* () {
        const stock = { "ABC-123": 10 };
        const transactions = [{ sku: "ABC-123", qty: -2 }];
        jest
            .spyOn(fs_1.promises, "readFile")
            .mockResolvedValueOnce(JSON.stringify(stock))
            .mockResolvedValueOnce(JSON.stringify(transactions));
        yield expect((0, stock_1.getStockLevel)("DEF-456")).rejects.toThrowError("SKU DEF-456 not found in stock.");
    }));
});
