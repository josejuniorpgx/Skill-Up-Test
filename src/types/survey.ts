export interface TeamMember {
    id: string;
    name: string;
    email: string;
    surveyLink?: string;
    hasCompleted?: boolean;
}

export interface SurveyQuestion {
    id: string;
    question: string;
    type: 'rating' | 'text';
    required: boolean;
    scale?: {
        min: number;
        max: number;
        minLabel: string;
        maxLabel: string;
    };
}

export interface SurveyResponse {
    id: string;
    surveyId: string;
    teamMemberId: string;
    responses: {
        questionId: string;
        value: number | string;
    }[];
    submittedAt: Date;
}

export interface Survey {
    id: string;
    managerId: string;
    title: string;
    description: string;
    questions: SurveyQuestion[];
    teamMembers: TeamMember[];
    responses: SurveyResponse[];
    createdAt: Date;
    status: 'draft' | 'active' | 'completed';
}

export interface SurveyAnalytics {
    averageScores: {
        questionId: string;
        average: number;
        question: string;
    }[];
    responseCount: number;
    completionRate: number;
}