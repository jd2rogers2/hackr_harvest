import { createContext, useState, useEffect } from 'react';


export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const getCurrentUser = async () => {};

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
}
