"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const get = (_req, res) => {
    const response = [];
    res.status(200).send(response);
};
router.get('/', get);
exports.default = { router };
//# sourceMappingURL=index.js.map