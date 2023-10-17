import { createContext, useState, useEffect } from 'react';


export const UserContext = createContext(null);

let isFetching = false;

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const getCurrentUser = async () => {
      if (isFetching) { return; }

      isFetching = true;
      const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/users/current`, {
        method: 'GET',
        credentials: 'include',
      });
      isFetching = false;

      if (res.ok) {
        const { user } = await res.json();
        setUser(user);

        setTimeout(() => {
          getCurrentUser();
        // }, 59 * 60 * 1000);
        }, 10 * 1000);
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
