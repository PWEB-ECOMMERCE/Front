import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import Inicio from '../app/(shop)/Inicio'
import AccountForm from '../app/(shop)/DetalheConta'
import AdminProducts from '@/components/AdminProducts';
import AdminSales from "@/components/AdminSales";
import ReportsPage from "@/components/reports/ReportsPage";
import ClientOrders from "@/components/ClientOrders";

export const SideBarContext = createContext({});

export function SideBarProvider({children}){
  const links = {
    anonymous: [
      {name:'Inicio',to:'/', component:<Inicio/>},
    ],
    authenticated: [
      {name:'Inicio',to:'/', component:<Inicio/>},
      {name:'Meus Pedidos',to: '/', component:<ClientOrders/>},
      {name:'Conta',to:"/account", component:<AccountForm/>},
    ],
    admin: [
      {name:'Produtos e Categorias',to:'/', component: <AdminProducts/>},
      {name:'Relatórios',to:'/', component: <ReportsPage/>},
      {name:'Vendas',to:'/', component: <AdminSales/>},
      {name:'Conta',to:'/', component:<AccountForm/>},
    ]
  }

  return (
    <SideBarContext.Provider value={{links}}>
      {children}
    </SideBarContext.Provider>
  )
}

