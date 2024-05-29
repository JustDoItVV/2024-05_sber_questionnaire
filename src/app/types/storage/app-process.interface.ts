import { Answer } from '../app/answer.interface';
import { Question } from '../app/question.interface';

export interface AppProcess {
  isLoading: boolean;
  questions: Question[];
  currentQuestion: number;
  userAnswers: Answer[];
}
