// src/components/TeamSetup/TeamSetup.tsx
import {useState} from 'react';
import {
    Paper,
    Title,
    Badge,
    Button,
    TextInput,
    Grid,
    Group,
    Box
} from '@mantine/core';
import {IconUser, IconUserCheck, IconArrowRight} from '@tabler/icons-react';
import styles from './TeamSetup.module.css';
import {TeamMember} from "@/types/survey";

interface TeamSetupProps {
    onSubmit: (members: TeamMember[]) => void;
    isLoading?: boolean;
}

export function TeamSetup({onSubmit, isLoading = false}: TeamSetupProps) {
    const [teamMembers, setTeamMembers] = useState<Partial<TeamMember>[]>([
        {id: '1', name: '', email: ''},
        {id: '2', name: '', email: ''},
        {id: '3', name: '', email: ''}
    ]);

    const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
        setTeamMembers(prev =>
            prev.map((member, i) =>
                i === index ? {...member, [field]: value} : member
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validMembers = teamMembers.filter(
            member => member.name && member.email
        ) as TeamMember[];

        if (validMembers.length > 0) {
            onSubmit(validMembers);
        }
    };

    const isFormValid = teamMembers.some(member => member.name && member.email);

    return (
        <Paper className={styles.paper}>
            <div className={styles.header}>
                <Title order={3} className={styles.title}>
                    Team Member Setup
                </Title>
                <Badge variant="light" color="gray" className={styles.badge}>
                    Step 1 of 3
                </Badge>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.membersContainer}>
                    {teamMembers.map((member, index) => (
                        <Paper key={member.id} className={styles.memberCard}>
                            <div className={styles.memberHeader}>
                                <Title order={5} className={styles.memberTitle}>
                                    Team Member {index + 1}
                                </Title>
                                {member.name && member.email ? (
                                    <IconUserCheck className={styles.iconCompleted}/>
                                ) : (
                                    <IconUser className={styles.iconIncomplete}/>
                                )}
                            </div>

                            <Grid gutter="md">
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="Full Name"
                                        placeholder="Enter full name"
                                        value={member.name || ''}
                                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                        className={styles.input}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="Email Address"
                                        placeholder="Enter email address"
                                        type="email"
                                        value={member.email || ''}
                                        onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                                        className={styles.input}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Paper>
                    ))}
                </div>

                <Group justify="flex-end" className={styles.submitGroup}>
                    <Button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        loading={isLoading}
                        rightSection={<IconArrowRight size={16}/>}
                        className={styles.submitButton}
                    >
                        Generate Survey Links
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}