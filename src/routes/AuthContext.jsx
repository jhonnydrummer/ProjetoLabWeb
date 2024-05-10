import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Adiciona o estado isAdmin como um booleano

  const login = async (username, password) => {
    const userData = {
      username: username,
      password: password,
    };
    
    try {
      const response = await fetch('https://lwlc-proj-2024.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const token = await response.json();
        localStorage.setItem("token", token);
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      return false; 
    }
  };

  const GetUtilizador = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const response = await fetch('https://lwlc-proj-2024.onrender.com/users', {
          headers: {
            'Authorization': token,
          }
        });

        const data = await response.json();
        const isAdmin = data.user_id; 

        setIsAdmin(isAdmin); 
        localStorage.setItem("isAdmin", isAdmin); 
      } else {
        console.log('Token não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar utilizador:', error);
    }
  };

  useEffect(() => {
    GetUtilizador(); // Chama GetUtilizador para definir isAdmin
  }, []);

  const logout = () => {
    setUser(null);
    setIsAdmin(false); 
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, GetUtilizador }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
