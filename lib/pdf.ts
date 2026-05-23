import * as pdf from "pdf-parse";

export async function extractPdfText(
  buffer: Buffer
) {
  const data =
    await pdf.default(buffer);

  return data.text;
}