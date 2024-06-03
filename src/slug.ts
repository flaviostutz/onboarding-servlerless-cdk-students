import { generateSlug } from 'random-word-slugs';

export function generateRandomSlug(count: number): string[] {
  const slugs: string[] = [];
  for (let i = 0; i < count; i += 1) {
    slugs.push(generateSlug());
  }
  return slugs;
}
