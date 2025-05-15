import { BaseService } from './baseService';
import { SurveyQuestion, QuestionWithResponse } from '../types/survey';
import { config } from '../config';

export type QuestionType = 'multiple_choice' | 'text' | 'scale' | 'boolean';

export interface SurveyQuestionData {
  id?: number;
  survey_id: number;
  question_text: string;
  question_type: QuestionType;
  order: number;
  required: boolean;
  options?: string[]; // For multiple choice questions
  min_scale?: number; // For scale questions
  max_scale?: number; // For scale questions
}

export class SurveyQuestionsService extends BaseService<SurveyQuestionData> {
  constructor(
    getToken: () => string | null,
    onUnauthorized: () => void
  ) {
    super(getToken, onUnauthorized);
  }

  async getQuestionsForSurvey(surveyId: number): Promise<SurveyQuestionData[]> {
    return this.request<SurveyQuestionData[]>(`${config.apiBaseUrl}/surveys/${surveyId}/questions`);
  }

  async getQuestion(questionId: number): Promise<SurveyQuestionData> {
    return this.request<SurveyQuestionData>(`${config.apiBaseUrl}/survey-questions/${questionId}`);
  }

  async getQuestionsBySurvey(surveyId: number): Promise<SurveyQuestionData[]> {
    return this.request<SurveyQuestionData[]>(`${config.apiBaseUrl}/surveys/${surveyId}/questions`);
  }

  async getQuestionsWithResponses(surveyId: number, userId: number): Promise<QuestionWithResponse[]> {
    return this.request<QuestionWithResponse[]>(`${config.apiBaseUrl}/surveys/${surveyId}/responses/${userId}`);
  }

  async reorderQuestions(surveyId: number, questionIds: number[]): Promise<void> {
    return this.request<void>(`${config.apiBaseUrl}/surveys/${surveyId}/questions/reorder`, {
      method: 'PUT',
      body: JSON.stringify({ question_ids: questionIds }),
    });
  }
}

export const surveyQuestionsService = new SurveyQuestionsService(
  () => null,
  () => {}
); 