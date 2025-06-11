import { useState } from 'react';
import {
  createSurvey,
  getSurveyByToken,
  getSurveyStatus,
  sendInvitationEmails,
  submitSurveyResponse
} from "@/api/survey";
import {CreateSurveyResponse, SurveyDataResponse} from "@/types/survey";

export const useSurvey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [surveyData, setSurveyData] = useState<CreateSurveyResponse | null>(null);

  const handleCreateSurvey = async (managerId: string, teamMembers: Array<{ name: string; email: string }>) => {
    setLoading(true);
    setError(null);

    try {
      const data = await createSurvey({ managerId, teamMembers });
      setSurveyData(data);
      return data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Failed to create survey';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStatus = async (surveyId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getSurveyStatus(surveyId);
      return data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Failed to get survey status';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmails = async (surveyId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await sendInvitationEmails(surveyId);
      return data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Failed to send emails';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    surveyData,
    createSurvey: handleCreateSurvey,
    getSurveyStatus: handleGetStatus,
    sendInvitationEmails: handleSendEmails,
  };
};


export const useSurveyResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyDataResponse | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const loadSurvey = async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getSurveyByToken(token);
      setSurveyData(data);

      if (data.hasCompleted) {
        setIsSubmitted(true);
      }

      return data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Survey not found';
      setError(errorMessage);
      setSurveyData(null);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const submitResponse = async (token: string, responses: Array<{ questionId: string; rating: number }>) => {
    setLoading(true);
    setError(null);

    try {
      const data = await submitSurveyResponse(token, { responses });
      setIsSubmitted(true);
      return data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Failed to submit survey';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setSurveyData(null);
    setIsSubmitted(false);
    setError(null);
  };

  return {
    loading,
    error,
    surveyData,
    isSubmitted,
    loadSurvey,
    submitResponse,
    resetState,
  };
};