import { Question, questionBanks as pt1 } from './questions_pt1';
import { questionBanksPt2 as pt2 } from './questions_pt2';

const allQuestionBanks = { ...pt1, ...pt2 };

export type { Question };

export const getQuestions = (studentClass: string, stream: string): Question[] => {
  const key = studentClass === "10" ? "Class10" : `Class${studentClass}_${stream}`;
  return allQuestionBanks[key] || [];
};
