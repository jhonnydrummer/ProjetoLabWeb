import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./AuthContext";
import Login from "../pages/login";
import Registo from "../pages/registo";
import GerenciarProdutos from "../pages/GerenciarProdutos/gerenciar-produtos";
import ExibirProdutos from "../componentes/exibirProdutos";
import AddProduto from "../pages/addProduto";
import EditProduto from "../pages/GerenciarProdutos/editProdutoPage";
import ModoDeVenda from "../pages/modoDeVenda";
import ListarUtilizadores from "../pages/Utilizadores/listarUtilizadores";
import SemPermissao from "../pages/semPermissao";
import Cart from "../pages/Order/cart";
import Checkout from "../pages/Order/checkout";
import VisualizarPedidos from '../pages/Order/visualizarPedidos'
import ThankYouForBuy from "../pages/Order/thankYouForBuy";
import Suporte from "../pages/suporte"

const PrivateRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/sem-permissao" />;
};

const RouterComponent = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sem-permissao" element={<SemPermissao />} />
      <Route path="/modo-de-venda" element={<ModoDeVenda />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thankYouForBuy" element={<ThankYouForBuy />} />
      <Route path="/suporte" element={<Suporte />} />

      <Route
        path="/gerenciar-produtos"
        element={
          <PrivateRoute>
            <GerenciarProdutos />
          </PrivateRoute>
        }
      />
      <Route
        path="/produtos"
        element={
          <PrivateRoute>
            <ExibirProdutos />
          </PrivateRoute>
        }
      />
      <Route
        path="/addProduto"
        element={
          <PrivateRoute>
            <AddProduto />
          </PrivateRoute>
        }
      />
      <Route
        path="/registo"
        element={
          <PrivateRoute>
            <Registo />
          </PrivateRoute>
        }
      />
      <Route
        path="/editarProduto/:productId"
        element={
          <PrivateRoute>
            <EditProduto />
          </PrivateRoute>
        }
      />
      <Route
        path="/listar-utilizadores"
        element={
          <PrivateRoute>
            <ListarUtilizadores />
          </PrivateRoute>
        }
      />
      <Route
        path="/pedidos"
        element={
          <PrivateRoute>
            <VisualizarPedidos />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <RouterComponent />
    </Router>
  </AuthProvider>
);

export default App;
