import { IconChevronLeftPipe, IconChevronRightPipe, IconMoon, IconSun } from '@tabler/icons-react';
import {
  Avatar,
  Burger,
  Group,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import classes from './MyHeader.module.css';
import { SettingsButton } from '@/components/buttons/SettingsButton';

export interface MyHeaderProps {
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
}

export function MyHeader({
  mobileOpened,
  desktopOpened,
  toggleDesktop,
  toggleMobile,
}: MyHeaderProps) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <>
      <Group pl={30} pr={30} h="100%" gap={5} justify="space-between" align="center">
        <UnstyledButton visibleFrom="lg" aria-label="Toggle SideBar" onClick={toggleDesktop}>
          {desktopOpened ? <IconChevronRightPipe stroke={2} /> : <IconChevronLeftPipe stroke={2} />}
        </UnstyledButton>
        <Group>
          <SettingsButton />
          <UnstyledButton
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle color scheme"
          >
            <IconSun className={`${classes.icon}  ${classes.light}`} stroke={1.5} />
            <IconMoon className={`${classes.icon}  ${classes.dark}`} stroke={1.5} />
          </UnstyledButton>
          <UnstyledButton aria-label="Open User Menu">
            <Avatar color="initials" alt="JA" name="Jose Alberto" />
          </UnstyledButton>
        </Group>

        <Burger
          aria-label="Toggle Sidebar"
          opened={mobileOpened}
          transitionDuration={700}
          onClick={() => {
            toggleMobile();
          }}
          size="sm"
          hiddenFrom="sm"
        />
      </Group>
    </>
  );
}
