'use client';

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MyHeader } from './MyHeader';
import MyNavBar from './MyNavBar';


export default function AppShellLayout({ children }: { children: any }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <AppShell
      transitionDuration={600}
      layout="alt"
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: 'sm', //It will be hidden on mobile
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      withBorder={false}
    >
      <AppShell.Header>
        <MyHeader
          desktopOpened={desktopOpened}
          mobileOpened={mobileOpened}
          toggleDesktop={toggleDesktop}
          toggleMobile={toggleMobile}
        />
      </AppShell.Header>
      <AppShell.Navbar>
        <MyNavBar mobileOpened={mobileOpened} toggleMobile={toggleMobile} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
