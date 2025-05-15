export interface Survey {
  id?: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  is_active: boolean;
}

export type QuestionType = 'multiple_choice' | 'text' | 'scale' | 'boolean';

export interface SurveyQuestion {
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

export interface SurveyResponse {
  id?: number;
  survey_id: number;
  user_id: number;
  question_id: number;
  response: string | number | boolean;
  created_at?: string;
}

// Additional types for survey management
export interface SurveyWithQuestions extends Survey {
  questions: SurveyQuestion[];
}

export interface SurveyWithResponses extends Survey {
  responses: SurveyResponse[];
}

export interface QuestionWithResponse extends SurveyQuestion {
  response?: SurveyResponse;
} 