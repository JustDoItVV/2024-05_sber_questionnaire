import { Difficulty } from './difficulty.enum';
import { QuestionType } from './question-type.enum';

export interface ApiQueryParams {
  amount: number;
  category: string | undefined;
  difficulty: Difficulty | undefined;
  type: QuestionType | undefined;
}
