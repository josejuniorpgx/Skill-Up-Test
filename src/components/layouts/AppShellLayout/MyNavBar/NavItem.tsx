import classes from "@/components/layouts/AppShellLayout/MyNavBar/MyNavBar.module.css";

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    path: string;
    isActive?: boolean;
    onClick: () => void;
}

export function NavItem({icon, label, path, isActive, onClick}: NavItemProps) {
    return (
        <span
            className={`${classes.navItem} ${isActive ? classes.navItemActive : classes.navItemInactive}`}
            onClick={onClick}
        >
      {icon}
            {label}
    </span>
    );
}