'use client';

import { useState } from 'react';
import {
  IconArrowsLeftRight, IconBook, IconCalendar, IconHelp,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import { Menu, Text, UnstyledButton } from '@mantine/core';
import classes from './SettingsButton.module.css';

export function SettingsButton() {
  const [opened, setOpened] = useState(false);
  return (
    <Menu shadow="md" radius={'md'} width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <UnstyledButton aria-label="Open Menu" h={24}>
          <div className={classes.iconWrapper}>
            <IconSettings className={`${classes.rotatingIcon} ${opened ? classes.rotated : ''}`} />
          </div>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item leftSection={<IconCalendar size={14} />}>Events</Menu.Item>
        <Menu.Item
          leftSection={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Information</Menu.Label>
        <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>Terms & Conditions</Menu.Item>
        <Menu.Item color="blue" leftSection={<IconHelp size={14} />}>
          Get Help
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
