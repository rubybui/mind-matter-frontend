import { BaseService } from './baseService';
import { Survey, SurveyWithQuestions, SurveyWithResponses } from '../types/survey';
import { config } from '../config';

export class SurveysService extends BaseService<Survey> {
  constructor(
    getToken: () => string | null,
    onUnauthorized: () => void
  ) {
    super(getToken, onUnauthorized);
  }

  async getActiveSurveys(): Promise<Survey[]> {
    return this.request<Survey[]>(`${config.apiBaseUrl}/surveys/active`);
  }

  async getSurvey(surveyId: number): Promise<Survey> {
    return this.request<Survey>(`${config.apiBaseUrl}/surveys/${surveyId}`);
  }

  async getSurveyWithQuestions(id: number): Promise<SurveyWithQuestions> {
    return this.request<SurveyWithQuestions>(`${config.apiBaseUrl}/surveys/${id}/questions`);
  }

  async getSurveyWithResponses(id: number): Promise<SurveyWithResponses> {
    return this.request<SurveyWithResponses>(`${config.apiBaseUrl}/surveys/${id}/responses`);
  }

  async submitSurveyResponse(surveyId: number, responses: Record<number, string>): Promise<void> {
    return this.request<void>(`${config.apiBaseUrl}/surveys/${surveyId}/responses`, {
      method: 'POST',
      body: JSON.stringify({ responses }),
    });
  }
}

export const surveysService = new SurveysService(
  () => null,
  () => {}
); 