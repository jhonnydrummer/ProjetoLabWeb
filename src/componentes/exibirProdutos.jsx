import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './exibirProdutos.css';
import DeleteProduto from '../pages/GerenciarProdutos/deletarProduto';
import BarraBusca from '../componentes/BarraBusca';

function ExibirProdutos() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [produtosPorPagina] = useState(5); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await fetch('https://lwlc-proj-2024.onrender.com/products', {
            headers: {
              'Authorization': token,
            }
          });

          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.log('Token não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setError('Erro ao buscar produtos');
      }
    }

    fetchProducts();
  }, []);

  const filterProducts = (myPesquisa) => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(myPesquisa.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); //Resetar para a primeira página após a filtragem
  };

  const redirecionaPaginaEdicao = (productId) => {
    navigate(`/editarProduto/${productId}`);
  };


  const handleDelete = async (productId) => {
    await DeleteProduto(productId, setProducts);
  };

  /////////////Lógica para cálculo dos produtos a serem exibidos na página atual
  let produtoAtual = [];
  if (filteredProducts.length > 0) {
    const indexDoUltimoProduto = currentPage * produtosPorPagina;
    const indexDoPrimeiroProduto = indexDoUltimoProduto - produtosPorPagina;
    produtoAtual = filteredProducts.slice(indexDoPrimeiroProduto, indexDoUltimoProduto);
  }

  ///////////Função para mudar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  //////////Atualiza os produtos filtrados sempre que os produtos mudar
  useEffect(() => {
    setFilteredProducts(products); 
  }, [products]);
  

  return (
    <div className="product-container">
      <BarraBusca filterProducts={filterProducts} /> 
      {error && <p className="error-message">{error}</p>}
      <table className="product-table">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {produtoAtual.map(product => (
            <tr key={product.product_id}>
              <td><img src={product.photo_link} alt={product.name} className="product-image" /></td>
              <td>{product.name}</td>
              <td id='ColunaPreco'>€{product.price}</td>
              <td className='areaDeAcao'>
                <button id='BotaoDeletar' onClick={() => handleDelete(product.product_id)}>Deletar</button>  
                <button id='BotaoEditar' onClick={() => redirecionaPaginaEdicao(product.product_id)}>Editar</button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="paginacao">
        {Array.from({ length: Math.ceil(filteredProducts.length / produtosPorPagina) }).map((_, index) => (
          <div key={index}>
            <button className={currentPage === index + 1 ? 'pagina-selecionada' : 'botaoPaginacao'}
              onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExibirProdutos;
