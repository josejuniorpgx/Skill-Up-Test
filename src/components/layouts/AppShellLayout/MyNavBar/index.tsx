import { Box, Burger, Divider, Group, Stack, Title } from '@mantine/core';
import classes from './MyNavBar.module.css';

interface MyNavBarProps {
  mobileOpened: boolean;
  toggleMobile: () => void;
}

export default function MyNavBar({ mobileOpened, toggleMobile }: MyNavBarProps) {
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
      <Divider size={1} />
      <Stack justify="space-between" h="100%" pb={50}>
      {/* Todo: Add Buttons */}
      </Stack>
    </Box>
  );
}
