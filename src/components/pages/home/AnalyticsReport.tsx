import {TeamMember} from "@/types/survey";

export function AnalyticsReport({teamMembers}: { teamMembers: TeamMember[] }) {
    return (
        <div>
            <h3>Analytics Report - Coming Soon</h3>
            <p>Results for {teamMembers.length} team members</p>
        </div>
    );
}