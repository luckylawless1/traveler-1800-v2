// One Sentence for a Traveler from 1800 — u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb
// v2: writes exactly one sentence (1-200 chars), built only from things a person
// from 1800 could picture, to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "It is a library holding every book ever written on a single shelf, and the librarian finds any page you ask for before you have finished the sentence.";

function gate(sentence: string): string {
  if (typeof sentence !== "string") throw new Error("sentence must be a string");
  if (sentence.length < 1 || sentence.length > 200)
    throw new Error(`sentence must be 1-200 characters, got ${sentence.length}`);
  if (sentence.trim().length === 0) throw new Error("sentence must not be only whitespace");
  if (sentence.includes("\n") || sentence.includes("\r"))
    throw new Error("sentence must be a single line");
  if (sentence.trim().length !== sentence.length)
    throw new Error("sentence must not have leading or trailing whitespace");
  if ((sentence.match(/\./g) ?? []).length !== 1)
    throw new Error("sentence must contain exactly one full stop: exactly one sentence");
  return sentence;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
const written = gate(SENTENCE) + "\n";
writeFileSync(outPath, written, "utf8");
// Read-back byte verification: what is on disk must be exactly what was written.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== written) throw new Error("read-back mismatch: entry.txt on disk differs from written bytes");
