import {Paper, Title, Badge, Text, Group} from '@mantine/core';
import {IconChevronRight} from '@tabler/icons-react';
import styles from './SideBar.module.css';

interface SidebarProps {
    currentStep: 'setup' | 'distribution' | 'collection' | 'analytics';
}

const steps = [
    {key: 'setup', label: 'Team Setup'},
    {key: 'distribution', label: 'Survey Distribution'},
    {key: 'collection', label: 'Response Collection'},
    {key: 'analytics', label: 'Analytics Report'}
];

const surveyQuestions = [
    {
        id: 1,
        question: 'How effectively does your manager communicate expectations?',
        scale: 'Scale: 1-5'
    },
    {
        id: 2,
        question: 'How well does your manager support your professional development?',
        scale: 'Scale: 1-5'
    },
    {
        id: 3,
        question: 'How would you rate your manager\'s overall leadership effectiveness?',
        scale: 'Scale: 1-5'
    }
];

const recentSurveys = [
    {
        id: 1,
        title: 'Q4 2024 Review',
        date: 'Completed Dec 15, 2024'
    },
    {
        id: 2,
        title: 'Mid-Year Check',
        date: 'Completed Jun 30, 2024'
    }
];

export function Sidebar({currentStep}: SidebarProps) {
    const getStepStatus = (stepKey: string) => {
        const stepIndex = steps.findIndex(step => step.key === stepKey);
        const currentIndex = steps.findIndex(step => step.key === currentStep);

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'in-progress';
        return 'pending';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'green';
            case 'in-progress':
                return 'blue';
            default:
                return 'gray';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Completed';
            case 'in-progress':
                return 'In Progress';
            default:
                return 'Pending';
        }
    };

    return (
        <div className={styles.container}>
            {/* Survey Progress */}
            <Paper className={styles.section}>
                <Title order={4} className={styles.sectionTitle}>
                    Survey Progress
                </Title>
                <div className={styles.progressList}>
                    {steps.map((step) => {
                        const status = getStepStatus(step.key);
                        return (
                            <Group key={step.key} justify="space-between" className={styles.progressItem}>
                                <Text size="sm" className={styles.stepLabel}>
                                    {step.label}
                                </Text>
                                <Badge
                                    variant="light"
                                    color={getStatusColor(status)}
                                    size="xs"
                                >
                                    {getStatusLabel(status)}
                                </Badge>
                            </Group>
                        );
                    })}
                </div>
            </Paper>

            {/* Survey Questions */}
            <Paper className={styles.section}>
                <Title order={4} className={styles.sectionTitle}>
                    Survey Questions
                </Title>
                <div className={styles.questionsList}>
                    {surveyQuestions.map((question) => (
                        <div key={question.id} className={styles.questionItem}>
                            <Text size="sm" className={styles.questionText}>
                                {question.id}. {question.question}
                            </Text>
                            <Text size="xs" className={styles.questionScale}>
                                {question.scale}
                            </Text>
                        </div>
                    ))}
                </div>
            </Paper>

            {/* Recent Surveys */}
            <Paper className={styles.section}>
                <Title order={4} className={styles.sectionTitle}>
                    Recent Surveys
                </Title>
                <div className={styles.surveysList}>
                    {recentSurveys.map((survey) => (
                        <Group key={survey.id} justify="space-between" className={styles.surveyItem}>
                            <div>
                                <Text size="sm" className={styles.surveyTitle}>
                                    {survey.title}
                                </Text>
                                <Text size="xs" className={styles.surveyDate}>
                                    {survey.date}
                                </Text>
                            </div>
                            <IconChevronRight className={styles.chevronIcon}/>
                        </Group>
                    ))}
                </div>
            </Paper>
        </div>
    );
}