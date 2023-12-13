"use client"
import * as React from "react"
import NextAppDirEmotionCacheProvider from "./EmotionCache"
import { MuiTheme } from "./MuiTheme"

export default function Theme({ children }: { children: React.ReactNode }) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
            <MuiTheme>{children}</MuiTheme>
        </NextAppDirEmotionCacheProvider>
    )
}
