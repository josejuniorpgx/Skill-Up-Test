export interface QuestionAnalytics {
    questionId: string;
    questionText: string;
    averageScore: number;
    responseCount: number;
}

export interface SurveyAnalyticsResponse {
    surveyId: string;
    totalMembers: number;
    completedResponses: number;
    completionRate: number;
    questionAnalytics: QuestionAnalytics[];
    overallAverage: number | null;
}
