"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomSlug = void 0;
const random_word_slugs_1 = require("random-word-slugs");
function generateRandomSlug(count) {
    const slugs = [];
    for (let i = 0; i < count; i++) {
        slugs.push((0, random_word_slugs_1.generateSlug)());
    }
    console.log(slugs);
    return slugs;
}

generateRandomSlug(5);
exports.generateRandomSlug = generateRandomSlug;
//# sourceMappingURL=slug.js.map