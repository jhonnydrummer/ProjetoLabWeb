import React, { useState, useEffect } from 'react';
import './style/modoDeVenda.css'
import SideBar from '../componentes/sidebar'
import BarraBusca from '../componentes/BarraBusca';


function ModoDeVenda() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [produtosPorPagina] = useState(8); // Número de produtos por página

  
  useEffect(() => {
    async function fetchProducts() {
        try {
            // Obtendo o token armazenado no localStorage
            const token = localStorage.getItem('token');

            if (token) {
                const response = await fetch('https://lwlc-proj-2024.onrender.com/products', {
                    headers: {
                        'Authorization': token,
                    }
                });

                const data = await response.json();
                setProducts(data);
            } else {
                console.log('Token não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    fetchProducts();
}, []);
  

   

  // Lógica para cálculo dos produtos a serem exibidos na página atual
  const indexOfLastProduct = currentPage * produtosPorPagina;
  const indexOfFirstProduct = indexOfLastProduct - produtosPorPagina;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Função para mudar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="products-container">
      
      <div className="Mysidebar">
        <SideBar/>
      </div>
      <div className="content-container">
        <div id='BarraBusca'>
          <BarraBusca filteredProducts={currentProducts}/>
        </div>      
        {error && <p className="error-message">{error}</p>}
        <div className="product-grid">
          {currentProducts.map(product => (
            <div key={product.product_id} className="products-item">
              <img src={product.photo_link} alt={product.name} className="product-images" />
              <div className="products-details">
                <h3 className="products-names">{product.name}</h3>
                <p className="products-prices">$ {product.price}</p>
              </div>
              <button id='BotaoComprar'>Comprar</button>
            </div>
          ))}
        </div>
        
        {/* Paginação */}
        <div className="MyPaginacao">
          {Array.from({ length: Math.ceil(products.length / produtosPorPagina) }).map((_, index) => (
            <div key={index}>
              <button className={currentPage === index + 1 ? 'pagina-selecionada' : 'botaoPaginacao'}
              onClick={() => paginate(index + 1)}>
              {index + 1}
              </button>            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  

}

export default ModoDeVenda;
