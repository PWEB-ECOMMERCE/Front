import { useState, useEffect, createContext } from "react";
import { useRouter } from 'next/navigation';

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
  const [token, setToken] = useState(null);
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

  const signIn = async ({email,password,admin}) => {
    setLoading(true);
    setError(null);
    const username = email;

    try {
      // WARN: Ainda não temos essa endpoint na api
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/login/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      })

      if (!response.ok) {
        throw new Error('Falha no login!');
      }

      const userData = await response.json();
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function signOut(){
    setUser(null);
    localStorage.clear();
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, error, loading, signIn, signOut, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

