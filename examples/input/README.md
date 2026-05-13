# Example input

Real client PDFs can't ship with the repo for confidentiality reasons. Instead, this folder contains a **synthetic but realistic** brief that you can use to test the pipeline.

The example mirrors the kind of document PDFjedi handles every day: a 4-page client brief plus a 1-page meeting-notes document, intentionally containing **two contradictions** and **several gaps** so you can see how PDFjedi handles imperfect input.

## Files

- [`brief.md`](brief.md) — the synthetic client brief. Read it as if it were a PDF.
- [`meeting-notes.md`](meeting-notes.md) — follow-up notes that contradict the brief in two places.

## How to use

1. Open Claude Code in the repo root.
2. Follow the **full-pipeline** instructions in `docs/how-to-use.md`.
3. When the execution prompt asks for source PDFs, point it at these two Markdown files (treat them as if they were PDFs — PDFjedi will adapt).
4. Compare the result against [`examples/output/`](../output/) to see what a clean run looks like.

The two intentional contradictions and several gaps are the point of the exercise — your run should surface them in `99-open-questions.md`.
