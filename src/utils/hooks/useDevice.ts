import { useMediaQuery, useTheme } from '@mui/material'

export function useDevice() {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    return { isDesktop }
}
