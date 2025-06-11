// src/components/SurveyPreview/SurveyPreview.tsx
import { useState } from 'react';
import {
    Container,
    Paper,
    Title,
    Text,
    Radio,
    Group,
    Button,
    Box
} from '@mantine/core';
import styles from './SurveyPreview.module.css';
import {SurveyQuestion} from "@/types/survey";
import {IconQuestionMark} from "@tabler/icons-react";

interface SurveyPreviewProps {
    questions?: SurveyQuestion[];
    isPreview?: boolean;
}

const defaultQuestions: SurveyQuestion[] = [
    {
        id: '1',
        question: 'How effectively does your manager communicate expectations?',
        type: 'rating',
        required: true,
        scale: {
            min: 1,
            max: 5,
            minLabel: 'Poor',
            maxLabel: 'Excellent'
        }
    },
    {
        id: '2',
        question: 'How well does your manager support your professional development?',
        type: 'rating',
        required: true,
        scale: {
            min: 1,
            max: 5,
            minLabel: 'Poor',
            maxLabel: 'Excellent'
        }
    },
    {
        id: '3',
        question: 'How would you rate your manager\'s overall leadership effectiveness?',
        type: 'rating',
        required: true,
        scale: {
            min: 1,
            max: 5,
            minLabel: 'Poor',
            maxLabel: 'Excellent'
        }
    }
];

export function SurveyPreview({ questions = defaultQuestions, isPreview = true }: SurveyPreviewProps) {
    const [responses, setResponses] = useState<Record<string, string>>({});

    const handleResponseChange = (questionId: string, value: string) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = () => {
        if (!isPreview) {
            console.log('Survey responses:', responses);
            // Aquí manejarías el envío real de la encuesta
        }
    };

    return (
        <section className={styles.section}>
            <Container size="lg">
                <div className={styles.header}>
                    <Title order={2} className={styles.title}>
                        Survey Preview
                    </Title>
                    <Text className={styles.description}>
                        This is what your team members will see when they access their survey link
                    </Text>
                </div>

                <div className={styles.previewContainer}>
                    <Paper className={styles.surveyCard}>
                        <div className={styles.surveyHeader}>
                            <IconQuestionMark size={48} className={styles.icon} />
                            <Title order={3} className={styles.surveyTitle}>
                                Leadership Feedback Survey
                            </Title>
                            <Text className={styles.surveyDescription}>
                                Your responses are completely anonymous and will help improve leadership effectiveness
                            </Text>
                        </div>

                        <div className={styles.questionsContainer}>
                            {questions.map((question, index) => (
                                <div key={question.id} className={styles.questionBlock}>
                                    <Text className={styles.questionText}>
                                        {index + 1}. {question.question}
                                    </Text>

                                    {question.type === 'rating' && question.scale && (
                                        <>
                                            <Radio.Group
                                                value={responses[question.id] || ''}
                                                onChange={(value) => handleResponseChange(question.id, value)}
                                                className={styles.radioGroup}
                                            >
                                                <Group className={styles.radioContainer}>
                                                    {Array.from({ length: question.scale.max - question.scale.min + 1 }, (_, i) => {
                                                        const value = String(question.scale!.min + i);
                                                        return (
                                                            <Radio
                                                                key={value}
                                                                value={value}
                                                                label={value}
                                                                className={styles.radioOption}
                                                            />
                                                        );
                                                    })}
                                                </Group>
                                            </Radio.Group>

                                            <Group justify="space-between" className={styles.scaleLabels}>
                                                <Text size="xs" className={styles.scaleLabel}>
                                                    {question.scale.minLabel}
                                                </Text>
                                                <Text size="xs" className={styles.scaleLabel}>
                                                    {question.scale.maxLabel}
                                                </Text>
                                            </Group>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className={styles.submitContainer}>
                            <Button
                                onClick={handleSubmit}
                                className={styles.submitButton}
                                disabled={isPreview}
                            >
                                Submit Feedback
                            </Button>
                        </div>
                    </Paper>
                </div>
            </Container>
        </section>
    );
}