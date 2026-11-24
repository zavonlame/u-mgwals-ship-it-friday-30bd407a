// Ship It Friday — u-mgwals-ship-it-friday-30bd407a.
// One line: the commit message an AI coding agent writes at 4:58pm on a
// Friday, right before it breaks production. The program's only job is to
// hand that line to the sealed scorer as /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The commit: cheerful, confident, Friday-rushed, and completely unaware
// that "rollback plan is just vibes" is not a plan.
const COMMIT =
  "ship: Friday 4:58pm, pushed straight to prod \u2014 rollback plan is just vibes and a prayer";

// The sealed gate: UTF-8 text of 1 to 159 characters, not only whitespace.
function gateOk(text: string): boolean {
  const chars = [...text].length;
  return chars >= 1 && chars <= 159 && text.trim().length > 0;
}

function main(): void {
  if (!gateOk(COMMIT)) {
    throw new Error(`commit fails the 1-159 gate at ${[...COMMIT].length} chars`);
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, COMMIT, "utf8");
  // The scorer runs this twice and gates the bytes, so confirm the file on
  // disk is exactly the commit before exiting cleanly.
  if (readFileSync(target, "utf8") !== COMMIT) {
    throw new Error("entry.txt does not match the commit message");
  }
}

main();
