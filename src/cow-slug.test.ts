// cow-slug.test.ts
import * as cowsay from 'cowsay';
import { generateSlug } from 'random-word-slugs';

import { showOutput } from './cow-slug';

jest.mock('cowsay');
jest.mock('random-word-slugs');

describe('showOutput', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all previous calls and instances
  });

  it('should generate a cow saying a random slug', () => {
    const mockSlug = 'test-slug';
    const mockCowsayOutput = `${mockSlug}`;

    // Mock implementations
    (generateSlug as jest.Mock).mockReturnValue(mockSlug);
    (cowsay.say as jest.Mock).mockReturnValue(mockCowsayOutput);

    // Call the function and assert the result
    const result = showOutput();
    expect(result).toBe(mockCowsayOutput);
    expect(generateSlug).toHaveBeenCalled();
    expect(cowsay.say).toHaveBeenCalledWith({ text: mockSlug });
  });
});
