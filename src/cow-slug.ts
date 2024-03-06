import * as cowsay from 'cowsay';
import { generateSlug } from 'random-word-slugs';

let output = cowsay.say({ text: generateSlug()});

console.log(output);