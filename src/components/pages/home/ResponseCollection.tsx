import {TeamMember} from "@/types/survey";

export function ResponseCollection({teamMembers, onComplete}: {
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