export interface NavigationItem {
    icon: React.ReactNode;
    label: string;
    path: string;
    badge?: number;
    isNew?: boolean;
}

export interface NavigationSection {
    label: string;
    items: NavigationItem[];
}

export interface MyNavBarProps {
    mobileOpened: boolean;
    toggleMobile: () => void;
    userRole?: 'manager' | 'admin' | 'user';
    activeSurveys?: number;
}

export interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    path: string;
    isActive?: boolean;
    badge?: number;
    isNew?: boolean;
    onClick: () => void;
}

export enum AppRoutes {
    DASHBOARD = '/dashboard',
    SURVEYS = '/surveys',
    RESULTS = '/results',
    TEAM_MEMBERS = '/team-members',
    PERFORMANCE_INSIGHTS = '/analytics/performance',
    TRENDS = '/analytics/trends',
    EXPORT_REPORTS = '/analytics/export',
    SURVEY_SETTINGS = '/settings/surveys',
    NOTIFICATIONS = '/settings/notifications',
    PROFILE = '/settings/profile'
}

export interface RoleBasedNavigation {
    manager: NavigationSection[];
    admin: NavigationSection[];
    user: NavigationSection[];
}

export interface NavigationPermissions {
    canAccessAnalytics: boolean;
    canAccessSettings: boolean;
    canCreateSurveys: boolean;
    canViewAllResults: boolean;
}

export type NavigationTheme = 'light' | 'dark';

export interface NavigationConfig {
    theme: NavigationTheme;
    collapsible: boolean;
    defaultCollapsed: boolean;
    showLabels: boolean;
    showBadges: boolean;
}