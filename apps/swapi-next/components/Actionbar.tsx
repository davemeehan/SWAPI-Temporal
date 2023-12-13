import { Box, PaperProps, useTheme } from "@mui/material"
import { PropsWithChildren } from "react"

export default function Actionbar({ children, ...rest }: PropsWithChildren<PaperProps>) {
    const theme = useTheme()
    const sx: PaperProps["sx"] = {
        p: 4,
        backgroundColor: theme.palette.background.default,
    }
    return (
        <Box sx={sx} {...rest}>
            {children}
        </Box>
    )
}
