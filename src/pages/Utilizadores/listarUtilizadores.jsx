import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './listarUtilizadores.css';
import SideBar from '../../componentes/sidebar'


function ListarUtilizadores() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPorPagina] = useState(7); 

  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await fetch('https://lwlc-proj-2024.onrender.com/users', {
            headers: {
              'Authorization': token,
            }
          });

          const data = await response.json();
          setUsers(data);
        } else {
          console.log('Token não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar utilizador:', error);
      }
    }

    fetchUsers();
  }, []);

  

  // Lógica para cálculo dos produtos a serem exibidos na página atual
  const indexOfLastUser = currentPage * usersPorPagina;
  const indexOfFirstUser = indexOfLastUser - usersPorPagina;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Função para mudar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    
    <div className="user-container">
      <div>
        <SideBar/>
    </div>
    <div className="content-container-users">
      {error && <p className="error-message">{error}</p>}
      <table className="user-table">
        
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Nome Completo</th>
            <th>Numero de telefone</th>
            <th>Morada</th>
            <th>E-mail</th>
            <th>Password</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody className='dadosUsers'>
          {currentUsers.map(user => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.full_name}</td>
              <td>{user.phone_number}</td>                          
              <td>{user.address}</td>
              <td>{user.email}</td>  
              <td>{user.password}</td>
              <td>{user.is_admin}</td>
            </tr>
          ))}
        </tbody>
        
      </table>

      {/* Paginação */}
      <div className="paginacao">
        {Array.from({ length: Math.ceil(users.length / usersPorPagina) }).map((_, index) => (
          <div key={index}>
            <button className={currentPage === index + 1 ? 'pagina-selecionada' : 'botaoPaginacao'}
              onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </div>
        ))}
      </div>
      <div id='listraFooter'></div>
          <footer className='rodape'>
            <Link to="/registo"><button id="openModalBtn">Add Utilizador</button></Link>
          </footer>

      </div>
     
    </div>
  );
}

export default ListarUtilizadores;