export function buildPrompt(assignment: any) {
  return `
You are an expert exam paper generator and teacher.

Generate a complete structured question paper AND a full answer key for every question — all in one response.

RULES:
- Divide into sections based on the rows provided
- Each section title must match the topic from INPUT DATA
- Each question must have: question (string), marks (number), difficulty (easy / medium / hard)
- For the answer key, provide an answer for EVERY question in order:
  - MCQ: correct option + brief explanation
  - Short answer: model answer in 1–3 sentences
  - Long answer: structured answer with key points
  - More marks = more detailed answer
- answerKey array must match questions in the SAME ORDER as they appear across all sections
- Return ONLY valid JSON, no markdown, no backticks, no explanation

---

INPUT DATA (STRUCTURED):
${JSON.stringify(assignment.rows, null, 2)}

---

PDF CONTENT (IMPORTANT CONTEXT):
${assignment.extractedText || "No PDF provided"}

---

ADDITIONAL INSTRUCTIONS:
${assignment.additional || "None"}

---

OUTPUT FORMAT (STRICT JSON ONLY, NO MARKDOWN):
{
  "schoolName": "School name from context or use a generic one",
  "subject": "Subject name",
  "class": "Class/Grade",
  "timeAllowed": "e.g. 45 Minutes",
  "maxMarks": 20,
  "sections": [
    {
      "sectionTitle": "Multiple Choice Questions",
      "instructions": "Choose the correct option.",
      "questions": [
        {
          "question": "Question here",
          "marks": 1,
          "difficulty": "easy"
        }
      ]
    }
  ],
  "answerKey": [
    {
      "qNum": 1,
      "sectionTitle": "Section name",
      "question": "The original question text",
      "answer": "Full model answer here",
      "keyPoints": ["Point 1", "Point 2"]
    }
  ]
}
`;
}