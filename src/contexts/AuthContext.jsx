import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({});

export function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  useEffect(() => {

  }, [])

  async function signIn({email,password}){

    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/usuarios`)
    const json = await data.json();
    console.log(json);

    setUser({
      nome:"Dante",
      email:"danteeng@hotmail.com",

    })
  }

  async function signOut(){
    setUser({ });
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}
