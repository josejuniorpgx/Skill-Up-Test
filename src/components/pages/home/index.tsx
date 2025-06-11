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
import {useSurvey} from "@/hooks/useSurvey";

type DashboardStep = 'setup' | 'distribution' | 'collection' | 'analytics';

export function HomeView() {
    const [currentStep, setCurrentStep] = useState<DashboardStep>('setup');
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [surveyId, setSurveyId] = useState<string>('');
    const {createSurvey, loading, error, surveyData} = useSurvey();


    const handleTeamSetupSubmit = async (members: TeamMember[]) => {
        if (!members || !Array.isArray(members) || members.length === 0) {
            console.error('Invalid members data:', members);
            return;
        }

        setIsLoading(true);

        try {
            const validMembers = members.filter(member =>
                member && member.name && member.email
            );
            if (validMembers.length === 0) {
                throw new Error('No valid team members provided');
            }
            const result = await createSurvey(
                "manager123", // O obtener de contexto de auth
                validMembers.map(member => ({
                    name: member.name,
                    email: member.email
                }))
            );
            setTeamMembers(result.teamMembers);
            setSurveyId(result.surveyId);
            setCurrentStep('distribution');

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
                                <AnalyticsReport surveyId={surveyId} />
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




