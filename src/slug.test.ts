// Import the function you want to test
import { generateRandomSlug } from './slug';

describe('generatesRandomSlug', () => {
  it('should generate an array of slugs with the specified count', () => {
    const count = 10;
    const slugs = generateRandomSlug(count);
    // Check if slugs is an array
    expect(Array.isArray(slugs)).toBe(true);
    // Check if slugs has the correct length
    expect(slugs.length).toBe(count);
    // Check if all elements in slugs are strings
    slugs.forEach((slug) => {
      expect(typeof slug).toBe('string');
    });
  });
});
