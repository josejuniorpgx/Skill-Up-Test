import { useState } from 'react';
import { getSurveyAnalytics } from '@/api/analytics';
import {SurveyAnalyticsResponse} from "@/types/analytics";

export const useAnalytics = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analytics, setAnalytics] = useState<SurveyAnalyticsResponse | null>(null);

    const loadAnalytics = async (surveyId: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getSurveyAnalytics(surveyId);
            setAnalytics(data);
            return data;
        } catch (err: any) {
            const errorMessage = err?.response?.data?.error || err?.message || 'Failed to load analytics';
            setError(errorMessage);
            setAnalytics(null);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const refreshAnalytics = async (surveyId: string) => {
        return loadAnalytics(surveyId);
    };

    return {
        loading,
        error,
        analytics,
        loadAnalytics,
        refreshAnalytics,
    };
};