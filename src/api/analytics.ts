import {SurveyAnalyticsResponse} from "@/types/analytics";
import {myApiService} from "@/lib/myApiService";
import {ApiResponse} from "@/types/api";

/**
 * Get survey analytics for manager
 * GET /api/v1/surveys/{surveyId}/analytics
 */
export const getSurveyAnalytics = async (surveyId: string) => {
    const response = await myApiService.getById<ApiResponse<SurveyAnalyticsResponse>>(
        `surveys/${surveyId}/analytics`
    );

    if (response.data?.success && response.data?.data) {
        return response.data.data;
    }

    throw new Error(response.data?.error || 'Failed to load analytics');
};