'use client'

import {AppBar, Toolbar, IconButton, Stack, Avatar, Menu, MenuItem, useTheme, Box } from '@mui/material'
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material'
import { useDevice } from '@/utils/hooks/useDevice'
import { useColorMode } from '@/components/ThemeProvider'
import { HEADER, NAV } from '@/config/global'
import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/context/UserContext'

export function Header({
                           onOpenNav,
                           isNavMini,
                       }: {
    onOpenNav?: () => void
    isNavMini?: boolean
}) {
    const theme = useTheme()
    const { isDesktop } = useDevice()
    const { toggleColorMode } = useColorMode()
    const router = useRouter()
    const { profile } = useUserContext()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <AppBar
            elevation={0}
            sx={{
                position: 'static',
                height: HEADER.H_MOBILE,
                backgroundColor: theme.palette.background.paper,
                zIndex: theme.zIndex.appBar + 1,
                ...(isDesktop && {
                    height: HEADER.H_DASHBOARD_DESKTOP,
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { xs: 2, md: 4 },
                    justifyContent: 'space-between',
                }}
            >
                {!isDesktop ? (
                    <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <Box />
                )}

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton onClick={toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>

                    {profile?.email && (
                        <>
                            <IconButton color="inherit" onClick={handleMenuOpen}>
                                <Avatar>{profile.email.charAt(0).toUpperCase()}</Avatar>
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                                <MenuItem onClick={() => router.push('/profile')}>Mon profil</MenuItem>
                                <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
                            </Menu>
                        </>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
