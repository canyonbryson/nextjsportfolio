#!/usr/bin/env node
/**
 * Generates public/resume.pdf from app/resume/resume.md
 * Uses md-to-pdf with local Chrome.
 */
import { mdToPdf } from "md-to-pdf";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const mdPath = resolve(root, "app/resume/resume.md");
const outPath = resolve(root, "public/resume.pdf");

const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function main() {
  console.log("Generating resume PDF…");
  const pdf = await mdToPdf(
    { path: mdPath },
    {
      launch_options: {
        executablePath: chromePath,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    }
  );

  if (pdf?.content) {
    writeFileSync(outPath, pdf.content);
    console.log(`✓ Written to ${outPath}`);
  } else {
    console.error("PDF generation failed — no content returned.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
