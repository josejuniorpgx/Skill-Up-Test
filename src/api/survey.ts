import {myApiService} from "@/lib/myApiService";
import {
    CreateSurveyRequest,
    CreateSurveyResponse,
    SubmitResponseRequest,
    SubmitResponseResponse,
    SurveyDataResponse
} from "@/types/survey";
import {ApiResponse} from "@/types/api";

export const createSurvey = async (data: CreateSurveyRequest) => {
    const response = await myApiService.create<ApiResponse<CreateSurveyResponse>, CreateSurveyRequest>(
        'surveys',
        data
    );
    if (response.data?.success && response.data?.data) {
        return response.data.data;
    }

    throw new Error(response.data?.error || 'Failed to create survey');
};


/**
 * Get survey status and progress
 * GET /api/v1/surveys/{surveyId}/status
 */
export const getSurveyStatus = async (surveyId: string) => {
    const response = await myApiService.getById<ApiResponse<any>>(`surveys/${surveyId}/status`);

    if (response.data?.success && response.data?.data) {
        return response.data.data;
    }

    throw new Error(response.data?.error || 'Failed to get survey status');
};

/**
 * Send invitation emails
 * POST /api/v1/surveys/{surveyId}/send-emails
 */
export const sendInvitationEmails = async (surveyId: string) => {
    const response = await myApiService.create<ApiResponse<any>, {}>(`surveys/${surveyId}/send-emails`, {});

    if (response.data?.success && response.data?.data) {
        return response.data.data;
    }

    throw new Error(response.data?.error || 'Failed to send emails');
};

/**
 * Load survey data for completion by team member
 * GET /api/v1/survey/{token}
 */
export const getSurveyByToken = async (token: string) => {
    const response = await myApiService.getById<ApiResponse<SurveyDataResponse>>(`survey/${token}`);

    if (response.data?.success && response.data?.data) {
        return response.data.data;
    }

    throw new Error(response.data?.error || 'Survey not found');
};

/**
 * Submit survey responses
 * POST /api/v1/survey/{token}/response
 */
export const submitSurveyResponse = async (token: string, data: SubmitResponseRequest) => {
    const response = await myApiService.create<ApiResponse<SubmitResponseResponse>, SubmitResponseRequest>(
        `survey/${token}/response`,
        data
    );

    if (response.data?.success && response.data?.data) {
        return response.data.data;
    }

    throw new Error(response.data?.error || 'Failed to submit survey');
};