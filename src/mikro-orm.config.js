"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Post_1 = require("./entities/Post");
var constants_1 = require("./constants");
var path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        // pattern: /^[\w-]+\d+\.[tj]s$/,
        glob: "!(*.d).{js,ts}",
    },
    entities: [Post_1.Post],
    dbName: "reddit",
    type: "postgresql",
    debug: !constants_1.__prod__,
    allowGlobalContext: true,
};
