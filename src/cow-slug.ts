import * as cowsay from 'cowsay';
import { generateSlug } from 'random-word-slugs';

export function showOutput(): string {
  const output = cowsay.say({ text: generateSlug() });
  return output;
}

showOutput();
