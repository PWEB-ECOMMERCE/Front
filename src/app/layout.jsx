// -import './global.css'
import React from 'react'
import { Inter } from 'next/font/google'
import ThemeRegistry from '@/utils/ThemeRegistry'
import { Providers } from '@/components/providers/Providers';

const inter = Inter({subsets: [ 'latin' ]})
export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <ThemeRegistry options={{key:'mui-theme'}}>
            <Providers>
              {children}
            </Providers>
          </ThemeRegistry>
        </body>
    </html>
  )
}
