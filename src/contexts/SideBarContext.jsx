import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';

export const SideBarContext = createContext({});

export function SideBarProvider({children}){
  const links = {
    anonymous: [
      {name:'Inicio',to:'/'},
    ],
    authenticated: [
      {name:'Inicio',to:'/'},
      {name:'Meus Pedidos',to:'/orders'},
      {name:'Produtos',to:'/products'},
      {name:'Conta',to:"/account"},
      {name:'Sair',to:'/logout'},
    ],
    admin: [
      {name:'Inicio',to:'/'},
      {name:'Produtos e Categorias',to:'/'},
      {name:'Vendas',to:'/'},
      {name:'Conta',to:'/'},
      {name:'Sair',to:'/logout'},
    ]
  }

  const [selection, setSelection] = useState(() => {
    if (typeof window !== 'undefined') {

      const savedIndex = localStorage.getItem('selectedIndex');
      return savedIndex ? parseInt(savedIndex, 10) : 100;
    }
    return 0;
  });

  // Update localStorage whenever selectedIndex changes
  const handleSetSelectedIndex = (index) => {
    setSelection(index);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedIndex', index);
    }
  };



  return (
    <SideBarContext.Provider value={{links, selection, handleSetSelectedIndex}}>
      {children}
    </SideBarContext.Provider>
  )
}

