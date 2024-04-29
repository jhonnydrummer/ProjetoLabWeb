import SideBar from '../componentes/sidebar'
import './style/gerenciarProdutos.css'
import BotaoPesquisar from '../img/icons/botaoSearch.png'
import ExibirProdutos from '../componentes/exibirProdutos'
import AddProduto from './addProduto'
import { Link } from 'react-router-dom'

const GerenciarProdutos = () => {

    return(
        <>
          <div className="container">
        <div className="Mysidebar">
          <SideBar/>
        </div>
        <div className="main-content">
          <header>
            <div className='buscar'>
              <h3 id='titulo'>Buscar Produtos</h3><input className='nome-do-produto'/>
                  <select id='tipoDeItem'>
                    <option>Todos</option>
                    <option>Smartphone</option>
                    <option>Relógio</option>
                    <option>Laptop</option>
                    <option>HeadPhone</option>
                    <option>Tablet</option>
                    </select>
                    <select id="meuCarrossel">                
                    <option value="todos">Todos</option>  
                    <option value="jan">Janeiro</option>
                    <option value="fev">Fevereiro</option>
                    <option value="mar">Março</option>
                    <option value="abr">Abril</option>
                    <option value="mai">Maio</option>
                    <option value="jun">Junho</option>
                    <option value="jul">Julho</option>
                    <option value="ago">Agosto</option>
                    <option value="set">Setembro</option>
                    <option value="out">Outubro</option>
                    <option value="nov">Novembro</option>
                    <option value="dez">Dezembro</option>
                    </select>

                    <select>
                    <option>Todos</option>
                    <option>Recentes</option>
                    <option>Menor para Maior</option>
                    <option>Maior para Menor</option>
                    <option>HeadPhone</option>
                  </select>
                  <a href="#" className='botaoSearch'><img id='botaoPesquisar' src={BotaoPesquisar} alt="Botão Pesquisar" />
</a>
              </div>
          </header>
          <div className='container'>
            <ExibirProdutos/>
          </div>

          <div id='listraFooter'></div>
          <footer className='rodape'>
            <Link to="/addProduto"><button id="openModalBtn">Add Produto</button></Link>
            <button>Gestão de vendas</button>
            <button>Gestão de comentários</button>
          </footer>
        </div>
    </div>

        
      </>
    );


    
    
}

export default GerenciarProdutos;    