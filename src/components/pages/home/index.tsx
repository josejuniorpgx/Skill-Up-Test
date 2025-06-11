'use client';

import {useState} from 'react';
import {Container, Grid} from '@mantine/core';
import styles from './Home.module.css';
import {TeamMember} from "@/types/survey";
import {SurveyDistribution} from "@/components/pages/home/SurveyDistribution";
import {Sidebar} from "@/components/pages/home/Sidebar";
import {SurveyPreview} from "@/components/pages/home/SurveyPreview";
import {HeroSection} from "@/components/pages/home/HeroSection";
import {TeamSetup} from "@/components/pages/home/TeamSetup";
import {AnalyticsReport} from "@/components/pages/home/AnalyticsReport";
import {ResponseCollection} from "@/components/pages/home/ResponseCollection";

type DashboardStep = 'setup' | 'distribution' | 'collection' | 'analytics';

export function HomeView() {
    const [currentStep, setCurrentStep] = useState<DashboardStep>('setup');
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleTeamSetupSubmit = async (members: TeamMember[]) => {
        setIsLoading(true);
        try {
            // Todo: Add Api
            const membersWithLinks = members.map(member => ({
                ...member,
                surveyLink: `${window.location.origin}/survey/${member.id}`,
                hasCompleted: false
            }));

            setTeamMembers(membersWithLinks);
            setCurrentStep('distribution');

            // Todo: Add API call to create survey
            // const response = await api.createSurvey(members);

        } catch (error) {
            console.error('Error creating survey:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.dashboard}>
            <HeroSection/>

            <section className={styles.content}>
                <Container size="xl" className={styles.container}>
                    <Grid gutter="xl">
                        <Grid.Col span={{base: 12, lg: 8}}>
                            {currentStep === 'setup' && (
                                <TeamSetup
                                    onSubmit={handleTeamSetupSubmit}
                                    isLoading={isLoading}
                                />
                            )}

                            {currentStep === 'distribution' && (
                                <SurveyDistribution
                                    teamMembers={teamMembers}
                                    onContinue={() => setCurrentStep('collection')}
                                />
                            )}

                            {currentStep === 'collection' && (
                                <ResponseCollection
                                    teamMembers={teamMembers}
                                    onComplete={() => setCurrentStep('analytics')}
                                />
                            )}

                            {currentStep === 'analytics' && (
                                <AnalyticsReport teamMembers={teamMembers}/>
                            )}
                        </Grid.Col>

                        <Grid.Col span={{base: 12, lg: 4}}>
                            <Sidebar currentStep={currentStep}/>
                        </Grid.Col>
                    </Grid>
                </Container>
            </section>

            <SurveyPreview/>
        </div>
    );
}




