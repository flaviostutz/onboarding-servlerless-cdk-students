import { generateSlug } from 'random-word-slugs';

export function generateRandomSlug(count: number): string[] {
  const slugs: string[] = [];
  for (let i = 0; i < count; i++) {
    slugs.push(generateSlug());
  }
  console.log(slugs);
  return slugs;
}