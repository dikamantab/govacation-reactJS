import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
          const [user, setUser] = useState(null);

          useEffect(() => {
                    const token = localStorage.getItem('token');
                    const userData = localStorage.getItem('user');

                    if (token && userData) {
                              const user = JSON.parse(userData);
                              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                              setUser(user);
                    }
          }, []);

          return (
                    <UserContext.Provider value={{ user, setUser }}>
                              {children}
                    </UserContext.Provider>
          );
};
