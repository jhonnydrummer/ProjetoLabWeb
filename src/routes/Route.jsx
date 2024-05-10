import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext"; // Importe useAuth do AuthContext
import Login from "../pages/login";
import Registo from "../pages/registo";
import GerenciarProdutos from "../pages/GerenciarProdutos/gerenciar-produtos";
import SideBar from "../componentes/sidebar";
import ExibirProdutos from "../componentes/exibirProdutos";
import AddProduto from "../pages/addProduto";
import EditProduto from "../pages/GerenciarProdutos/editProdutoPage";
import ModoDeVenda from "../pages/modoDeVenda";
import ListarUtilizadores from "../pages/Utilizadores/listarUtilizadores";
import React from "react";
import SemPermissao from "../pages/semPermissao";

const RouterComponent = () => {
  const { is_admin } = useAuth();

  return (
          
        <Routes>
          <Route
            path="/gerenciar-produtos"
            element={
              is_admin ? (
                <GerenciarProdutos />
              ) : (
                <Navigate to="/sem-permissao" />
              )
            }
          />
          <Route
            path="/produtos"
            element={
              is_admin ? <ExibirProdutos /> : <Navigate to="/sem-permissao" />
            }
          />
          <Route
            path="/addProduto"
            element={
              is_admin ? <AddProduto /> : <Navigate to="/sem-permissao" />
            }
          />
           <Route
            path="/registo"
            element={
              is_admin ? <Registo /> : <Navigate to="/sem-permissao" />
            }
          />
          <Route
            path="/editarProduto/:productId"
            element={
              is_admin ? <EditProduto /> : <Navigate to="/sem-permissao" />
            }
          />
          <Route
            path="/listar-utilizadores"
            element={
              is_admin ? (
                <ListarUtilizadores />
              ) : (
                <Navigate to="/sem-permissao" />
              )
            }
          />
          <Route path="/sem-permissao" element={<SemPermissao />} />
          <Route path="/modo-de-venda" element={<ModoDeVenda />} />
          <Route path="/" element={<Login />} />
        </Routes>
      
  );
};

export default RouterComponent;
