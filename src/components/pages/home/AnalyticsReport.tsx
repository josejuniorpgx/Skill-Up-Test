import {useEffect} from 'react';
import {useAnalytics} from '@/hooks/useAnalytics';
import {Box, Text, Title, Paper, Group, Stack, Progress, Badge, Loader, Alert} from '@mantine/core';
import {IconTrendingUp, IconUsers, IconCheckbox, IconAlertCircle} from '@tabler/icons-react';

interface AnalyticsReportProps {
    surveyId: string;
}

export function AnalyticsReport({surveyId}: AnalyticsReportProps) {
    const {loadAnalytics, analytics, loading, error} = useAnalytics();

    useEffect(() => {
        if (surveyId) {
            loadAnalytics(surveyId);
        }
    }, [surveyId]);

    if (loading) {
        return (
            <Box ta="center" py="xl">
                <Loader size="lg"/>
                <Text mt="md" c="dimmed">Loading analytics...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Alert icon={<IconAlertCircle size="1rem"/>} title="Error loading analytics" color="red">
                {error}
            </Alert>
        );
    }

    if (!analytics) {
        return (
            <Text c="dimmed" ta="center" py="xl">
                No analytics data available
            </Text>
        );
    }

    return (
        <Stack gap="lg">
            <Title order={3}>Survey Analytics</Title>

            {/* Summary Cards */}
            <Group grow>
                <Paper p="md" withBorder>
                    <Group gap="xs">
                        <IconUsers size="1.5rem" color="blue"/>
                        <div>
                            <Text size="xs" c="dimmed">Total Members</Text>
                            <Text size="xl" fw={700}>{analytics.totalMembers}</Text>
                        </div>
                    </Group>
                </Paper>

                <Paper p="md" withBorder>
                    <Group gap="xs">
                        <IconCheckbox size="1.5rem" color="green"/>
                        <div>
                            <Text size="xs" c="dimmed">Completed</Text>
                            <Text size="xl" fw={700}>{analytics.completedResponses}</Text>
                        </div>
                    </Group>
                </Paper>

                <Paper p="md" withBorder>
                    <Group gap="xs">
                        <IconTrendingUp size="1.5rem" color="orange"/>
                        <div>
                            <Text size="xs" c="dimmed">Overall Average</Text>
                            <Text size="xl" fw={700}>
                                {analytics.overallAverage ? analytics.overallAverage.toFixed(1) : 'N/A'}
                            </Text>
                        </div>
                    </Group>
                </Paper>
            </Group>

            {/* Progress Bar */}
            <Paper p="md" withBorder>
                <Text size="sm" fw={500} mb="xs">Response Progress</Text>
                <Progress
                    value={analytics.completionRate}
                    size="lg"
                    radius="sm"
                    color={analytics.completionRate === 100 ? 'green' : 'blue'}
                />
                <Text size="sm" c="dimmed" mt="xs">
                    {analytics.completionRate.toFixed(1)}% completed
                    ({analytics.completedResponses}/{analytics.totalMembers})
                </Text>
            </Paper>

            {/* Question Analytics */}
            {analytics.questionAnalytics.length > 0 && (
                <Paper p="md" withBorder>
                    <Title order={4} mb="md">Question Results</Title>
                    <Stack gap="md">
                        {analytics.questionAnalytics.map((question, index) => (
                            <Box key={question.questionId}>
                                <Group justify="space-between" mb="xs">
                                    <Text size="sm" fw={500}>
                                        {index + 1}. {question.questionText}
                                    </Text>
                                    <Badge
                                        color={question.averageScore >= 4 ? 'green' : question.averageScore >= 3 ? 'yellow' : 'red'}
                                        variant="light"
                                    >
                                        {question.averageScore.toFixed(1)}/5.0
                                    </Badge>
                                </Group>

                                <Progress
                                    value={(question.averageScore / 5) * 100}
                                    size="md"
                                    color={question.averageScore >= 4 ? 'green' : question.averageScore >= 3 ? 'yellow' : 'red'}
                                />

                                <Text size="xs" c="dimmed" mt="xs">
                                    Based on {question.responseCount} responses
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                </Paper>
            )}

            {/* No responses yet */}
            {analytics.completedResponses === 0 && (
                <Alert color="blue" title="Waiting for responses">
                    No responses have been submitted yet. Share the survey links with your team members.
                </Alert>
            )}
        </Stack>
    );
}