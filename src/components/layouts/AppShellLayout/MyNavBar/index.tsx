'use client';
import {Box, Group, Title, Burger, Divider, Stack, Text} from '@mantine/core';
import {
    IconHome,
    IconClipboardList,
    IconChartBar,
    IconUsers,
    IconChartPie,
    IconTrendingUp,
    IconDownload,
    IconSettings,
    IconBell,
    IconUserCircle
} from '@tabler/icons-react';
import {useRouter, usePathname} from 'next/navigation';
import classes from './MyNavBar.module.css';
import {NavItem} from "@/components/layouts/AppShellLayout/MyNavBar/NavItem";

interface MyNavBarProps {
    mobileOpened: boolean;
    toggleMobile: () => void;
}


//todo: Move the constants to a separate fil.
export default function MyNavBar({mobileOpened, toggleMobile}: MyNavBarProps) {
    const router = useRouter();

    const handleNavigation = (path: string, isDisable: boolean) => {
        if (isDisable) {
            return;
        }
        router.push(path);
    };

    const mainNavItems = [
        {
            icon: <IconHome className={classes.navIcon}/>,
            label: 'home',
            path: '/',
            isDisabled: false
        },
        {
            icon: <IconClipboardList className={classes.navIcon}/>,
            label: 'Surveys',
            path: '/surveys',
            isDisabled: true
        },
        {
            icon: <IconChartBar className={classes.navIcon}/>,
            label: 'Results',
            path: '/results',
            isDisabled: true
        },
        {
            icon: <IconUsers className={classes.navIcon}/>,
            label: 'Team Members',
            path: '/team-members',
            isDisabled: true
        }
    ];

    const analyticsNavItems = [
        {
            icon: <IconChartPie className={classes.navIcon}/>,
            label: 'Performance Insights',
            path: '/analytics/performance',
            isDisabled: true
        },
        {
            icon: <IconTrendingUp className={classes.navIcon}/>,
            label: 'Trends',
            path: '/analytics/trends',
            isDisabled: true
        },
        {
            icon: <IconDownload className={classes.navIcon}/>,
            label: 'Export Reports',
            path: '/analytics/export',
            isDisabled: true
        }
    ];

    const settingsNavItems = [
        {
            icon: <IconSettings className={classes.navIcon}/>,
            label: 'Survey Settings',
            path: '/settings/surveys',
            isDisabled: true
        },
        {
            icon: <IconBell className={classes.navIcon}/>,
            label: 'Notifications',
            path: '/settings/notifications',
            isDisabled: true
        },
        {
            icon: <IconUserCircle className={classes.navIcon}/>,
            label: 'Profile',
            path: '/settings/profile',
            isDisabled: true
        }
    ];

    return (
        <Box className={classes.NavBarContainer} h="100%">
            <Group pl={30} pr={30} h={50} justify="space-between" align="center">
                <Title order={1}>Skill UP</Title>
                <Burger
                    transitionDuration={700}
                    aria-label="Toggle Sidebar"
                    opened={mobileOpened}
                    onClick={() => {
                        toggleMobile();
                    }}
                    size="sm"
                    hiddenFrom="sm"
                />
            </Group>

            <Divider size={1}/>

            <nav className={classes.navigation}>
                {/* Main Section */}
                <div className={classes.navigationSection}>
                    <Text className={classes.sectionLabel}>Main</Text>
                    <div className={classes.navItems}>
                        {mainNavItems.map((item) => (
                            <NavItem
                                key={item.path}
                                icon={item.icon}
                                label={item.label}
                                path={item.path}
                                isActive={usePathname() === item.path}
                                onClick={() => handleNavigation(item.path, item.isDisabled)}
                            />
                        ))}
                    </div>
                </div>

                {/* Analytics Section */}
                <div className={classes.navigationSection}>
                    <Text className={classes.sectionLabel}>Analytics</Text>
                    <div className={classes.navItems}>
                        {analyticsNavItems.map((item) => (
                            <NavItem
                                key={item.path}
                                icon={item.icon}
                                label={item.label}
                                path={item.path}
                                isActive={usePathname() === item.path}
                                onClick={() => handleNavigation(item.path, item.isDisabled)}
                            />
                        ))}
                    </div>
                </div>

                {/* Settings Section */}
                <div className={classes.navigationSection}>
                    <Text className={classes.sectionLabel}>Settings</Text>
                    <div className={classes.navItems}>
                        {settingsNavItems.map((item) => (
                            <NavItem
                                key={item.path}
                                icon={item.icon}
                                label={item.label}
                                path={item.path}
                                isActive={usePathname() === item.path}
                                onClick={() => handleNavigation(item.path, item.isDisabled)}
                            />
                        ))}
                    </div>
                </div>
            </nav>
        </Box>
    );
}