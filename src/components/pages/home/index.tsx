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

type DashboardStep = 'setup' | 'distribution' | 'collection' | 'analytics';

export function HomeView() {
    const [currentStep, setCurrentStep] = useState<DashboardStep>('setup');
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleTeamSetupSubmit = async (members: TeamMember[]) => {
        setIsLoading(true);
        try {
            // Simular API call para generar links únicos
            const membersWithLinks = members.map(member => ({
                ...member,
                surveyLink: `${window.location.origin}/survey/${member.id}`,
                hasCompleted: false
            }));

            setTeamMembers(membersWithLinks);
            setCurrentStep('distribution');

            // Aquí harías la llamada real a la API
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

// Componentes placeholder para los otros pasos

function ResponseCollection({teamMembers, onComplete}: {
    teamMembers: TeamMember[];
    onComplete: () => void;
}) {
    return (
        <div>
            <h3>Response Collection - Coming Soon</h3>
            <p>Waiting for {teamMembers.length} responses</p>
            <button onClick={onComplete}>Complete</button>
        </div>
    );
}

function AnalyticsReport({teamMembers}: { teamMembers: TeamMember[] }) {
    return (
        <div>
            <h3>Analytics Report - Coming Soon</h3>
            <p>Results for {teamMembers.length} team members</p>
        </div>
    );
}