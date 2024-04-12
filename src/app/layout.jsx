import React from 'react';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/utils/ThemeRegistry';
import { Providers } from './providers';

const inter = Inter({subsets: [ 'latin' ]})
export default async function RootLayout({ children }) {
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
