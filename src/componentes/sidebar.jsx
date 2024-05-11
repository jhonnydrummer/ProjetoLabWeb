import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./sidebar.css";
import Logomarca from "../img/logo_escuro.png";
import gerenciarProdutosIcon from "../img/icons/gerenciar-produtos.svg";
import mododeVendaIcon from "../img/icons/modo-de-venda.svg";
import pedidosIcon from "../img/icons/pedidos.svg";
import mensagensIcon from "../img/icons/mensagens.svg";
import suporteIcon from "../img/icons/suporte.svg";
import utilizadoresIcon from "../img/icons/utilizadores.svg";
import logoutIcon from "../img/icons/logout.svg";
import { useAuth } from "../routes/AuthContext";

const Sidebar = ({ loggedInUsername }) => {
  const { logout, user } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState(null);
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  function handleLogout(event) {
    const confirmacao = window.confirm("Deseja realmente sair?");

    if (!confirmacao) {
      event.preventDefault();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
      logout();
    }
  }
  const usernameLogged = localStorage.getItem('user')
  const isAdminBoolean = !!localStorage.getItem('isAdmin');
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <img id="logo_side_bar" src={Logomarca} />
        </div>
        <div id="linha"></div>

        <div id="perfil">
            <p>{isAdminBoolean  ? 'Admin' : 'User'}</p>
            <h4>{usernameLogged}</h4>
        </div>

        <ul className="components">
         {loggedInUser && (
        <>
          <li>
            <Link to="/gerenciar-produtos">
              <img className="icons" src={gerenciarProdutosIcon} />
              Gerenciar Produtos
            </Link>
          </li>
          <li>
            <Link to="/listar-utilizadores">
              <img className="icons" src={utilizadoresIcon} />
              Listar Utilizadores
            </Link>
          </li>
          </>)}
          <li>
            <Link to="/modo-de-venda">
              <img className="icons" src={mododeVendaIcon} />
              Modo de Venda
            </Link>
          </li>
          {loggedInUser && (
        <>
          <li>
        
          
            <Link to="/pedidos">
              <img className="icons" src={pedidosIcon} />
              Pedidos
            </Link>
          </li>
          <li>
            <Link to="/mensagens">
              <img className="icons" src={mensagensIcon} />
              Mensagens
            </Link>
          </li>
        </> )} 

          <li>
            <Link to="/suporte">
              <img className="icons" src={suporteIcon} />
              Suporte
            </Link>
          </li>
          <div id="linhaBottom"></div>
        </ul>
        <Link to="/" onClick={handleLogout}>
          <img className="iconsLogout" src={logoutIcon} />
          Logout
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
