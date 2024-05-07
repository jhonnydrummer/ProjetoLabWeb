import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Registo from '../pages/registo';
import GerenciarProdutos from '../pages/GerenciarProdutos/gerenciar-produtos';
import SideBar from '../componentes/sidebar';
import ExibirProdutos from '../componentes/exibirProdutos';
import AddProduto from '../pages/addProduto';
import EditProduto from '../pages/GerenciarProdutos/editProdutoPage';
import ModoDeVenda from '../pages/modoDeVenda';
import ListarUtilizadores from '../pages/Utilizadores/listarUtilizadores';

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/registo" element={<Registo />} />
        <Route path="/gerenciar-produtos" element={<GerenciarProdutos />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/produtos" element={<ExibirProdutos />} />
        <Route path="/addProduto" element={<AddProduto />} />
        <Route path="/editarProduto/:productId" element={<EditProduto />} />
        <Route path="/modo-de-venda" element={<ModoDeVenda />} />
        <Route path="/listar-utilizadores" element={<ListarUtilizadores />} />
      </Routes>
    </Router>
  );
}

export default RouterComponent;