"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomSlugs = generateRandomSlugs;
var random_word_slugs_1 = require("random-word-slugs");
function generateRandomSlugs(count) {
    var slugs = [];
    for (var i = 0; i < count; i++) {
        slugs.push((0, random_word_slugs_1.generateSlug)());
    }
    return slugs;
}
// Script para gerar e imprimir as frases
var slugs = generateRandomSlugs(10);
console.log(slugs);
