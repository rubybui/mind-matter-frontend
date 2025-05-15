import { useAuth } from '@/app/context/AuthContext';
import { SurveysService } from './surveys';
import { SurveyQuestionsService } from './surveyQuestions';
import { ProfilesService } from './profiles';

export function useServices() {
  const { token, signOut } = useAuth();

  const getAuthToken = () => token;
  const onUnauthorized = () => signOut();

  return {
    surveys: new SurveysService(getAuthToken, onUnauthorized),
    surveyQuestions: new SurveyQuestionsService(getAuthToken, onUnauthorized),
    profiles: new ProfilesService(getAuthToken, onUnauthorized),
  };
} 