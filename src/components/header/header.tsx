'use client'

import {AppBar, Toolbar, IconButton, Stack, Avatar, Menu, MenuItem, useTheme, Box,} from '@mui/material'
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material'
import { useDevice } from '@/utils/hooks/useDevice'
import { useColorMode } from '@/components/ThemeProvider'
import { HEADER, NAV } from '@/config/global'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [email, setEmail] = useState<string | null>(null)
    const open = Boolean(anchorEl)

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            setEmail(user?.email || null)
        }
        getUser()
    }, [])

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <AppBar
            elevation={0}
            sx={{
                position: 'absolute',
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                backgroundColor: theme.palette.background.paper,
                zIndex: theme.zIndex.appBar + 1,
                ...(isDesktop && {
                    width: `calc(100% - ${isNavMini ? NAV.W_DASHBOARD_MINI : NAV.W_DASHBOARD}px)`,
                    height: HEADER.H_DASHBOARD_DESKTOP,
                }),
            }}
        >
            <Toolbar sx={{ height: 1, px: { xs: 2, md: 4 } }}>
                {!isDesktop && (
                    <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
                        <MenuIcon />
                    </IconButton>
                )}

                <Box sx={{ ml: 'auto' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton onClick={toggleColorMode}>
                            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>

                        {email && (
                            <>
                                <IconButton color="inherit" onClick={handleMenuOpen}>
                                    <Avatar>{email.charAt(0).toUpperCase()}</Avatar>
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                                    <MenuItem onClick={() => router.push('/profile')}>Мой профиль</MenuItem>
                                    <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                                </Menu>
                            </>
                        )}
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    )
}


