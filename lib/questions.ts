// Typed re-export surface for the Next.js app. Implementation in questions.mjs.

import * as impl from "./questions.mjs";

export interface QuestionSet {
  themeId: string;
  questions: string[];
}

export const QUESTIONS = impl.QUESTIONS as readonly QuestionSet[];

export const getQuestionsForTheme = impl.getQuestionsForTheme as (
  themeId: string,
) => string[];
