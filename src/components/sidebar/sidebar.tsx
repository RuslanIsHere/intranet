'use client';

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Toolbar,
    IconButton,
    useTheme,
    useMediaQuery,
    Box,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { text: 'Dashboard', href: '/', icon: <DashboardIcon /> },
    { text: 'RH', href: '/rh', icon: <PeopleIcon /> },
    { text: 'Projects', href: '/projects', icon: <WorkIcon /> },
];

export default function Sidebar({
                                    mobileOpen,
                                    onCloseAction,
                                    collapsed,
                                    onCollapseChange,
                                }: {
    mobileOpen: boolean;
    onCloseAction: () => void;
    collapsed: boolean;
    onCollapseChange?: (collapsed: boolean) => void;
}) {
    const theme = useTheme();
    const pathname = usePathname();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const drawerWidth = collapsed ? 60 : 240;

    const handleCollapse = () => {
        onCollapseChange?.(!collapsed);
    };

    const drawerContent = (
        <>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    px: 2,
                    py: 1.5,
                    minHeight: 'auto',
                }}
            >
                {!collapsed && (
                    <Box
                        component="img"
                        src="/logo.svg"
                        alt="Logo"
                        sx={{
                            height: 60,
                            width: 130,
                            objectFit: 'contain',
                            transition: '0.3s',
                        }}
                    />
                )}

                {!isMobile && (
                    <IconButton
                        onClick={handleCollapse}
                        size="small"
                        sx={{ ml: collapsed ? 0 : 1 }}
                    >
                        {collapsed ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                )}
            </Toolbar>

            <List>
                {navItems.map(({ text, href, icon }) => (
                    <ListItem
                        key={text}
                        disablePadding
                        sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                    >
                        <ListItemButton
                            component={Link}
                            href={href}
                            selected={pathname === href}
                            onClick={isMobile ? onCloseAction : undefined}
                            sx={{
                                justifyContent: collapsed ? 'center' : 'flex-start',
                                px: 2,
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}>
                                {icon}
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary={text} />}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return isMobile ? (
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={onCloseAction}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: 240 } }}
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
    );
}
