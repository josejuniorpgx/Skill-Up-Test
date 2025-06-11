import '@mantine/core/styles.css';

import React from 'react';
import {ColorSchemeScript, mantineHtmlProps, MantineProvider} from '@mantine/core';
import {theme} from '../../theme';
import AppShellLayout from "@/components/layouts/AppShellLayout";

export const metadata = {
    title: 'Skill UP',
    description: 'Hi Welcome to Skill UP!',
};

export default function RootLayout({children}: { children: any }) {
    return (
        <html lang="en" {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript/>
            <link rel="shortcut icon" href="/favicon.svg"/>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
        </head>
        <body>
        <MantineProvider theme={theme}><AppShellLayout>{children}</AppShellLayout></MantineProvider>
        </body>
        </html>
    );
}
