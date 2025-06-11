import {Container, Grid, Text, Title} from '@mantine/core';
import {IconUsers, IconLink, IconChartBar} from '@tabler/icons-react';
import styles from './HeroSection.module.css';

export function HeroSection() {
    return (
        <section className={styles.hero}>
            <Container size="lg" className={styles.container}>
                <div className={styles.content}>
                    <Title order={1} className={styles.title}>
                        AI-Powered Leadership Feedback
                    </Title>
                    <Text size="lg" className={styles.subtitle}>
                        Collect anonymous feedback from your team members and get actionable insights to improve your
                        leadership skills
                    </Text>

                    <Grid gutter="xl" className={styles.features}>
                        <Grid.Col span={4}>
                            <div className={styles.feature}>
                                <div className={styles.iconWrapper}>
                                    <IconUsers size={32} className={styles.icon}/>
                                </div>
                                <Title order={4} className={styles.featureTitle}>
                                    Add Team Members
                                </Title>
                                <Text size="sm" className={styles.featureDescription}>
                                    Input names and emails of up to 3 team members
                                </Text>
                            </div>
                        </Grid.Col>

                        <Grid.Col span={4}>
                            <div className={styles.feature}>
                                <div className={styles.iconWrapper}>
                                    <IconLink size={32} className={styles.icon}/>
                                </div>
                                <Title order={4} className={styles.featureTitle}>
                                    Generate Survey Links
                                </Title>
                                <Text size="sm" className={styles.featureDescription}>
                                    Unique anonymous survey links for each team member
                                </Text>
                            </div>
                        </Grid.Col>

                        <Grid.Col span={4}>
                            <div className={styles.feature}>
                                <div className={styles.iconWrapper}>
                                    <IconChartBar size={32} className={styles.icon}/>
                                </div>
                                <Title order={4} className={styles.featureTitle}>
                                    View Analytics
                                </Title>
                                <Text size="sm" className={styles.featureDescription}>
                                    Get detailed reports and average scores
                                </Text>
                            </div>
                        </Grid.Col>
                    </Grid>
                </div>
            </Container>
        </section>
    );
}