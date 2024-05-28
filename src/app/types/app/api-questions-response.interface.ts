import { Question } from './question.interface';

export interface ApiQuestionResponse {
  responseCode: number;
  results: Question[];
}
