'use client'

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    IconButton,
    useTheme,
    useMediaQuery,
    Box,
} from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Link from 'next/link'
import { useState } from 'react'

const navItems = [
    { text: 'Dashboard', href: '/' },
    { text: 'RH', href: '/rh' },
    { text: 'Projects', href: '/projects' },
]

export default function Sidebar({ mobileOpen, onClose, onCollapseChange }: {
    mobileOpen: boolean
    onClose: () => void
    onCollapseChange?: (collapsed: boolean) => void
}) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [collapsed, setCollapsed] = useState(false)

    const drawerWidth = collapsed ? 60 : 240

    const handleCollapse = () => {
        const newValue = !collapsed
        setCollapsed(newValue)
        onCollapseChange?.(newValue)
    }

    const drawerContent = (
        <>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                {!isMobile && (
                    <IconButton onClick={handleCollapse}>
                        {collapsed ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                )}
            </Toolbar>
            <List>
                {navItems.map(({ text, href }) => (
                    <ListItem key={text} disablePadding sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
                        <ListItemButton
                            component={Link}
                            href={href}
                            onClick={isMobile ? onClose : undefined}
                            sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                        >
                            <ListItemText primary={collapsed ? '' : text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    )

    return isMobile ? (
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 240,
                },
            }}
        >
            {drawerContent}
        </Drawer>
    ) : (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    transition: 'width 0.3s',
                },
            }}
            open
        >
            {drawerContent}
        </Drawer>
    )
}
