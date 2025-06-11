// src/components/SurveyDistribution/SurveyDistribution.tsx
import {useState} from 'react';
import {
    Paper,
    Title,
    Badge,
    Button,
    Text,
    Group,
    CopyButton,
    ActionIcon,
    Tooltip,
    Alert,
    List,
    ThemeIcon
} from '@mantine/core';
import {
    IconMail,
    IconCopy,
    IconCheck,
    IconLink,
    IconSend,
    IconInfoCircle,
    IconUser
} from '@tabler/icons-react';
import styles from './SurveyDistribution.module.css';
import {TeamMember} from "@/types/survey";

interface SurveyDistributionProps {
    teamMembers: TeamMember[];
    onContinue: () => void;
}

export function SurveyDistribution({teamMembers, onContinue}: SurveyDistributionProps) {
    const [emailsSent, setEmailsSent] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendEmail = async (memberId: string) => {
        setIsLoading(true);
        try {
            // Simular envío de email
            await new Promise(resolve => setTimeout(resolve, 1000));
            setEmailsSent(prev => [...prev, memberId]);
        } catch (error) {
            console.error('Error sending email:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendAllEmails = async () => {
        setIsLoading(true);
        try {
            // Simular envío masivo
            await new Promise(resolve => setTimeout(resolve, 2000));
            const allMemberIds = teamMembers.map(member => member.id);
            setEmailsSent(allMemberIds);
        } catch (error) {
            console.error('Error sending emails:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const allEmailsSent = teamMembers.every(member => emailsSent.includes(member.id));

    return (
        <Paper className={styles.paper}>
            <div className={styles.header}>
                <Title order={3} className={styles.title}>
                    Survey Distribution
                </Title>
                <Badge variant="light" color="blue" className={styles.badge}>
                    Step 2 of 3
                </Badge>
            </div>

            <Alert
                icon={<IconInfoCircle size={16}/>}
                title="Survey Links Generated Successfully!"
                color="green"
                className={styles.alert}
            >
                Your survey links have been generated. You can now distribute them to your team members.
            </Alert>

            <div className={styles.content}>
                <div className={styles.actionsHeader}>
                    <Text size="sm" className={styles.subtitle}>
                        Send survey invitations to {teamMembers.length} team members
                    </Text>
                    <Button
                        onClick={handleSendAllEmails}
                        loading={isLoading && !allEmailsSent}
                        disabled={allEmailsSent}
                        leftSection={<IconSend size={16}/>}
                        className={styles.sendAllButton}
                    >
                        {allEmailsSent ? 'All Emails Sent' : 'Send All Invitations'}
                    </Button>
                </div>

                <div className={styles.membersList}>
                    {teamMembers.map((member) => {
                        const emailSent = emailsSent.includes(member.id);

                        return (
                            <Paper key={member.id} className={styles.memberCard}>
                                <div className={styles.memberInfo}>
                                    <div className={styles.memberDetails}>
                                        <Group gap="xs">
                                            <ThemeIcon variant="light" size="sm">
                                                <IconUser size={14}/>
                                            </ThemeIcon>
                                            <div>
                                                <Text fw={500} size="sm" className={styles.memberName}>
                                                    {member.name}
                                                </Text>
                                                <Text size="xs" c="dimmed">
                                                    {member.email}
                                                </Text>
                                            </div>
                                        </Group>
                                    </div>

                                    <div className={styles.memberActions}>
                                        <Group gap="xs">
                                            <CopyButton value={member.surveyLink || ''}>
                                                {({copied, copy}) => (
                                                    <Tooltip label={copied ? 'Copied!' : 'Copy link'}>
                                                        <ActionIcon
                                                            variant="subtle"
                                                            onClick={copy}
                                                            className={styles.actionButton}
                                                        >
                                                            {copied ? <IconCheck size={16}/> : <IconCopy size={16}/>}
                                                        </ActionIcon>
                                                    </Tooltip>
                                                )}
                                            </CopyButton>

                                            <Button
                                                size="xs"
                                                variant={emailSent ? "light" : "filled"}
                                                color={emailSent ? "green" : "blue"}
                                                onClick={() => handleSendEmail(member.id)}
                                                loading={isLoading && !emailSent}
                                                disabled={emailSent}
                                                leftSection={emailSent ? <IconCheck size={14}/> : <IconMail size={14}/>}
                                            >
                                                {emailSent ? 'Sent' : 'Send Email'}
                                            </Button>
                                        </Group>
                                    </div>
                                </div>

                                <div className={styles.linkContainer}>
                                    <Group gap="xs">
                                        <IconLink size={14} className={styles.linkIcon}/>
                                        <Text size="xs" className={styles.linkText} lineClamp={1}>
                                            {member.surveyLink}
                                        </Text>
                                    </Group>
                                </div>
                            </Paper>
                        );
                    })}
                </div>

                <div className={styles.instructions}>
                    <Title order={5} className={styles.instructionsTitle}>
                        Next Steps:
                    </Title>
                    <List size="sm" className={styles.instructionsList}>
                        <List.Item>Team members will receive anonymous survey links</List.Item>
                        <List.Item>Each survey takes approximately 2-3 minutes to complete</List.Item>
                        <List.Item>Responses are automatically collected and anonymized</List.Item>
                        <List.Item>You'll be notified when all responses are received</List.Item>
                    </List>
                </div>

                <Group justify="flex-end" className={styles.footer}>
                    <Button
                        onClick={onContinue}
                        rightSection={<IconCheck size={16}/>}
                        disabled={!allEmailsSent}
                    >
                        Continue to Collection
                    </Button>
                </Group>
            </div>
        </Paper>
    );
}