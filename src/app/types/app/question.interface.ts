import { Difficulty } from './difficulty.enum';
import { QuestionType } from './question-type.enum';

export interface Question {
  type: QuestionType;
  difficulty: Difficulty;
  category: string;
  question: string;
  options: string[];
  correctAnswer?: string | string[];
  incorrectAnswers?: string[];
}
