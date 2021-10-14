"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./route"));
const constant_1 = require("./constant");
const app = (0, express_1.default)();
app.use('/api', route_1.default.router);
app.set('Content-Type', 'application/json');
app.listen(constant_1.API_PORT, () => console.log(`Running on port ${constant_1.API_PORT}`));
//# sourceMappingURL=index.js.map