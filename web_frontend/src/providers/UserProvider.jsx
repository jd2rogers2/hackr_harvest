import { createContext, useState, useEffect } from 'react';


export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const getCurrentUser = async () => {
      const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/users/current`, {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        const { user } = await res.json();
        setUser(user);
      }
    };

    useEffect(() => {
      if (!user) {
        getCurrentUser();
      }
    }, [user]);

    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
}
