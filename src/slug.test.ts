import { generateRandomSlugs } from './slug';

describe('generateRandomSlugs', () => {
  it('should generate the correct number of slugs', () => {
    const count = 10;
    const slugs = generateRandomSlugs(count);
    expect(slugs.length).toBe(count);
  });

  it('should generate an array of strings', () => {
    const slugs = generateRandomSlugs(5);
    slugs.forEach(slug => {
      expect(typeof slug).toBe('string');
    });
  });
});
