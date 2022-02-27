"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var core_1 = require("@mikro-orm/core");
var Post = /** @class */ (function () {
    function Post() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    __decorate([
        (0, core_1.PrimaryKey)({ type: "number" })
    ], Post.prototype, "id", void 0);
    __decorate([
        (0, core_1.Property)({ type: "date" })
    ], Post.prototype, "createdAt", void 0);
    __decorate([
        (0, core_1.Property)({ type: "date", onUpdate: function () { return new Date(); } })
    ], Post.prototype, "updatedAt", void 0);
    __decorate([
        (0, core_1.Property)({ type: "text" })
    ], Post.prototype, "title", void 0);
    Post = __decorate([
        (0, core_1.Entity)()
    ], Post);
    return Post;
}());
exports.Post = Post;
