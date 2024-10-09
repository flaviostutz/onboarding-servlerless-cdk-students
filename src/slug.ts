import { generateSlug } from 'random-word-slugs';

export function generateRandomSlugs(count: number): string[] {
  const slugs: string[] = [];
  for (let i = 0; i < count; i++) {
    slugs.push(generateSlug());
  }
  return slugs;
}

// Script para gerar e imprimir as frases
const slugs = generateRandomSlugs(10);
console.log(slugs);
