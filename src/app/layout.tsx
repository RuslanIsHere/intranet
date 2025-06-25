'use client'

import { usePathname } from 'next/navigation'
import MuiThemeProvider from '@/components/ThemeProvider'
import Sidebar from '@/components/sidebar/sidebar'
import { Header } from '@/components/header/header'
import { Box, CssBaseline, useMediaQuery } from '@mui/material'
import { useState, useEffect } from 'react'
import { NAV } from '@/config/global'
import { UserProvider } from '@/context/UserContext'
import { useUserContext } from '@/context/UserContext'
import AppLoader from '@/components/AppLoader'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <body>
        <UserProvider>
            <MainLayout>{children}</MainLayout>
        </UserProvider>
        </body>
        </html>
    )
}

function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAuthPage = pathname === '/login' || pathname === '/register';
    const { loading } = useUserContext()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const isMobile = useMediaQuery('(max-width:960px)')

    useEffect(() => {
        if (isMobile && collapsed) {
            setCollapsed(false)
        }
    }, [collapsed, isMobile])

    const handleCollapseChange = (value: boolean) => {
        if (!isMobile) {
            setCollapsed(value)
        }
    }

    const drawerWidth = collapsed ? NAV.W_DASHBOARD_MINI : NAV.W_DASHBOARD

    return (
        <MuiThemeProvider>
            <CssBaseline />

            <Box sx={{ position: 'relative' }}>
                {/* Оверлей с блюром и лоадером */}
                {loading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backdropFilter: 'blur(6px)',
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AppLoader />
                    </Box>
                )}

                {/* Основной layout */}
                <Box sx={{ pointerEvents: loading ? 'none' : 'auto' }}>
                    {!isAuthPage ? (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    md: `${drawerWidth}px 1fr`,
                                },
                                gridTemplateRows: {
                                    xs: '64px 1fr',
                                    md: '80px 1fr',
                                },
                                minHeight: '100vh',
                                gridTemplateAreas: {
                                    xs: `"header" "main"`,
                                    md: `"sidebar header" "sidebar main"`,
                                },
                            }}
                        >
                            <Box sx={{ gridArea: 'header' }}>
                                <Header
                                    onOpenNav={() => setMobileOpen(true)}
                                    isNavMini={collapsed}
                                />
                            </Box>
                            <Box sx={{ gridArea: 'sidebar' }}>
                                <Sidebar
                                    mobileOpen={mobileOpen}
                                    onCloseAction={() => setMobileOpen(false)}
                                    collapsed={collapsed}
                                    onCollapseChange={handleCollapseChange}
                                />
                            </Box>
                            <Box component="main" sx={{ gridArea: 'main', p: 3 }}>
                                {children}
                            </Box>
                        </Box>
                    ) : (
                        children
                    )}
                </Box>
            </Box>
        </MuiThemeProvider>
    )
}

