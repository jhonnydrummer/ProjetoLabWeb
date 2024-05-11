import React, { useState, useEffect } from 'react';

const CheckAdmin = ({ userId }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('token');

        if (token && userId) {
          const response = await fetch(`https://lwlc-proj-2024.onrender.com/users/${userId}`, {
            headers: {
            "Content-Type": "application/json",
              'Authorization': token,
            }
          });

          const user = await response.json();
          setIsAdmin(user.is_admin === "true");
        } else {
          console.log('Token ou userId não encontrados.');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    }

    fetchUser();
  }, [userId]);

  return isAdmin;
};

export default CheckAdmin;
