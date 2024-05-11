import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Adiciona o estado isAdmin

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
        await recuperarUsuario(username, password); // Espera pela recuperação do usuário antes de retornar
        
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      return false; 
    }
  };

  const recuperarUsuario = async (username, password) => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const response = await fetch('https://lwlc-proj-2024.onrender.com/users', {
          headers: {
            'Authorization': token,
          }
        });

        if (response.ok) {
          const users = await response.json();
          const authenticatedUser = users.find(user => user.username === username && user.password === password);

          if (authenticatedUser) {
            setUser(authenticatedUser);
            setIsAdmin(authenticatedUser.is_admin); 

            localStorage.setItem('user', authenticatedUser.username); // Armazena o usuário como JSON no localStorage
            localStorage.setItem('isAdmin', authenticatedUser.is_admin);
          }
        } else {
          console.log('Erro ao recuperar dados do usuário:', response.statusText);
        }
      } else {
        console.log('Token não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar utilizador:', error);
    }
  }

  const logout = () => {
    setUser(null);
    setIsAdmin(false); 
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  useEffect(() => {
    // Recupera o usuário do localStorage ao iniciar o componente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
