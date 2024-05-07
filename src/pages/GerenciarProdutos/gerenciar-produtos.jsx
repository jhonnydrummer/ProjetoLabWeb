import SideBar from '../../componentes/sidebar'
import BarraBusca from '../../componentes/BarraBusca'
import ExibirProdutos from '../../componentes/exibirProdutos'
import { Link } from 'react-router-dom'

const GerenciarProdutos = () => {

    return(
        <>
          <div className="container">
        <div className="Mysidebar">
          <SideBar/>
        </div>
        <div className="main-content">
          <BarraBusca/>
          <div className='container'>
            <ExibirProdutos/>
          </div>

          <div id='listraFooter'></div>
          <footer className='rodape'>
            <Link to="/addProduto"><button id="openModalBtn">Add Produto</button></Link>
            <button>Gestão de vendas</button>
          </footer>
        </div>
    </div>

        
      </>
    );


    
    
}

export default GerenciarProdutos;    