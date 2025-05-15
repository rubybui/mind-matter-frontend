import { BaseService } from './baseService';

export interface SurveyResponse {
  id?: number;
  survey_id: number;
  user_id: number;
  question_id: number;
  response: string | number | boolean;
  created_at?: string;
}

class SurveyResponsesService extends BaseService<SurveyResponse> {
  constructor() {
    super('survey-responses', 'id', 'created_at');
  }

  async getResponsesBySurvey(surveyId: number): Promise<SurveyResponse[]> {
    const response = await this.getAll();
    return response.filter(response => response.survey_id === surveyId);
  }

  async getResponsesByUser(userId: number): Promise<SurveyResponse[]> {
    const response = await this.getAll();
    return response.filter(response => response.user_id === userId);
  }

  async submitSurveyResponses(responses: Omit<SurveyResponse, 'id'>[]): Promise<SurveyResponse[]> {
    const promises = responses.map(response => this.create(response));
    return Promise.all(promises);
  }
}

export const surveyResponsesService = new SurveyResponsesService(); 