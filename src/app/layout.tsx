'use client'

import { usePathname } from 'next/navigation'
import MuiThemeProvider from '@/components/ThemeProvider'
import Sidebar from '@/components/sidebar/sidebar'
import { Header } from '@/components/header/header'
import { Box, CssBaseline } from '@mui/material'
import { useState } from 'react'
import { NAV } from '@/config/global'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAuthPage = pathname === '/login'

    const [mobileOpen, setMobileOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    const drawerWidth = collapsed ? NAV.W_DASHBOARD_MINI : NAV.W_DASHBOARD

    return (
        <html lang="en">
        <body>
        <MuiThemeProvider>
            <CssBaseline />
            {!isAuthPage ? (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: `${drawerWidth}px 1fr`,
                        },
                        gridTemplateRows: 'auto 1fr',
                        minHeight: '100vh',
                        gridTemplateAreas: {
                            xs: `"header" "main"`,
                            md: `"sidebar header" "sidebar main"`,
                        },
                    }}
                >
                    <Box sx={{ gridArea: 'header' }}>
                        <Header onOpenNav={() => setMobileOpen(true)}
                                isNavMini={collapsed}
                        />
                    </Box>
                    <Box sx={{ gridArea: 'sidebar' }}>
                        <Sidebar
                            mobileOpen={mobileOpen}
                            onClose={() => setMobileOpen(false)}
                            onCollapseChange={setCollapsed}
                        />
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            gridArea: 'main',
                            p: 3,
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            ) : (
                children
            )}
        </MuiThemeProvider>
        </body>
        </html>
    )
}
