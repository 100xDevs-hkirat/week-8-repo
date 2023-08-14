"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoObj = exports.userObj = void 0;
const zod_1 = require("zod");
exports.userObj = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.todoObj = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string()
});
