import { createContext, useState, useEffect } from 'react';


export const UserContext = createContext(null);

let isFetching = false;

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const getCurrentUser = async (payload) => {
      if (isFetching) { return; }

      isFetching = true;
      const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/users/current`, {
        ...(payload ? {
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' },
        }: {}),
        method: 'POST',
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

        return true;
      } else {
        return false;
      }
    };

    useEffect(() => {
      if (!user) {
        getCurrentUser();
      }
    }, [user]);

    return (
      <UserContext.Provider value={{ user, setUser, signIn: getCurrentUser }}>
        {children}
      </UserContext.Provider>
    );
}
