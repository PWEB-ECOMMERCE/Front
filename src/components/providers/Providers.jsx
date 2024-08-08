'use client'

import { AuthProvider } from "@/contexts/AuthContext"
import { SideBarProvider } from "@/contexts/SideBarContext"

export function Providers({children}){
  return (
    <AuthProvider>
      <SideBarProvider>
        {children}
      </SideBarProvider>
    </AuthProvider>
  )
}
