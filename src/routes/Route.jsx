import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/login'
import Registo from '../pages/registo'
import GerenciarProdutos from '../pages/gerenciar-produtos'
import SideBar from '../componentes/sidebar'
import ExibirProdutos from "../componentes/exibirProdutos";
import AddProduto from "../pages/addProduto";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    children: [],
  },
  {
    path: "/registo",
    element: <Registo/>,
    children: [],
  },
  {
    path: "/gerenciar-produtos",
    element: <GerenciarProdutos/>,
    children: [],
  },
  {
  path: "/sidebar",
    element: <SideBar/>,
    children: [],
  },
  {
  path: "/produtos",
  element: <ExibirProdutos/>,
  children: [],
},
{
  path: "/addProduto",
  element: <AddProduto/>,
  children: [],
},

]);


