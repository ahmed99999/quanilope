"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const rows_1 = __importDefault(require("./rows"));
const columns_1 = __importDefault(require("./columns"));
const router = (0, express_1.Router)();
exports.router = router;
router.use('/rows', rows_1.default.router).use('/columns', columns_1.default.router);
exports.default = { router };
//# sourceMappingURL=index.js.map