import { useState, useEffect, createContext } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookies';

export const AuthContext = createContext({});

const getInitialState = () => {
  const currentUser = localStorage.getItem("user");
  return currentUser ? JSON.parse(currentUser) : null;
}

/**
 *
 * @param {Object}props - The Properties object.
 * @param {React.ReactNode} props.children - The child nodes to be rendered within the container
 * @returns {JSX.Element} The rendered component
 */
export function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect( () => {
    if(user){
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user] )

  useEffect( () => {
    if (!user){
      let usr = getInitialState();
      setUser(usr);
    }
  }, [] )


  const signIn = async ({username,password,admin}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      })

      if (!response.ok){
        throw new Error("Não foi possível fazer o login");
      }
      const userData = await response.json();
      setUser(userData);
      return {'data':userData, 'status':'ok'};
    } catch (err) {
      setError(err.message);
      return {'error':err.message}
    } finally {
      setLoading(false);
    }
  }

  async function signOut(){
    setUser(null);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API}/login/logout`, {
        method: 'GET',
        credentials: 'include'
      })
    } catch (error) {
      console.error(error);
      setError(error);
    }
    Cookies.removeItem("JSESSIONID", {path:'/', domain:'localhost'})
    localStorage.clear();
    window.dispatchEvent(new Event('cartUpdated'));
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, error, loading, signIn, signOut, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

