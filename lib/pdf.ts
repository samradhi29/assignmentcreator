import fs from "fs";
import { extractText } from "unpdf";

export async function extractPdfText(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  const uint8Array = new Uint8Array(buffer);

  const { text } = await extractText(uint8Array, { mergePages: true });

  return text;
}