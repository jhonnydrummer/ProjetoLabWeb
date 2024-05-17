import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext"; // Importe useAuth do AuthContext
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
import Cart from "../pages/Order/cart";
import Checkout from "../pages/Order/checkout";
import VisualizarPedidos from '../pages/Order/visualizarPedidos'
import ThankYouForBuy from "../pages/Order/thankYouForBuy";

const RouterComponent = () => {
  const { isAdmin } = useAuth();

  return (
    <Routes>
      <Route
        path="/gerenciar-produtos"
        element={
          isAdmin ? <GerenciarProdutos /> : <Navigate to="/sem-permissao" />
        }
      />
      <Route
        path="/produtos"
        element={
          isAdmin ? <ExibirProdutos /> : <Navigate to="/sem-permissao" />
        }
      />
      <Route
        path="/addProduto"
        element={isAdmin ? <AddProduto /> : <Navigate to="/sem-permissao" />}
      />
      <Route
        path="/registo"
        element={isAdmin ? <Registo /> : <Navigate to="/sem-permissao" />}
      />
      <Route
        path="/editarProduto/:productId"
        element={isAdmin ? <EditProduto /> : <Navigate to="/sem-permissao" />}
      />
      <Route
        path="/listar-utilizadores"
        element={
          isAdmin ? <ListarUtilizadores /> : <Navigate to="/sem-permissao" />
        }
      />
      <Route
        path="/pedidos"
        element={
          isAdmin ? <VisualizarPedidos /> : <Navigate to="/sem-permissao" />
        }
      />
      <Route path="/sem-permissao" element={<SemPermissao />} />
      <Route path="/modo-de-venda" element={<ModoDeVenda />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thankYouForBuy" element={<ThankYouForBuy />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default RouterComponent;
