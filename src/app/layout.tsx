import MuiThemeProvider from '@/components/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <MuiThemeProvider>{children}</MuiThemeProvider>
        </body>
        </html>
    );
}
