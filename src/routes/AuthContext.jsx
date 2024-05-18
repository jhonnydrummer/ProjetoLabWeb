import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

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
        localStorage.setItem("user", username);
        await recuperarUsuario(username, password); 
        
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

          // Configurar isAdmin no localStorage independentemente do status do usuário
          localStorage.setItem('user', authenticatedUser.username); 
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
  };
  

  const logout = () => {
    setUser(null);
    setIsAdmin(false); 
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAdmin = localStorage.getItem("isAdmin");

    if (storedUser) {
      setUser(storedUser);
      setIsAdmin(storedIsAdmin === 'true');
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
