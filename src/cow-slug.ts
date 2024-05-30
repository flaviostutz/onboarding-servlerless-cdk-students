import * as cowsay from 'cowsay';
import { generateSlug } from 'random-word-slugs';

const output = cowsay.say({ text: generateSlug() });

function showOutput(): string {
  return output;
}

showOutput();
