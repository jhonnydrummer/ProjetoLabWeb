import React, { useState, useEffect } from 'react';
import './style/modoDeVenda.css';
import SideBar from '../componentes/sidebar';
import BarraBusca from '../componentes/BarraBusca';
import Cart from './Order/cart'; 

function ModoDeVenda() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [produtosPorPagina] = useState(8); // Número de produtos por página
  const [cart, setCart] = useState([]); // Estado para o carrinho de compras

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
        setError("Erro ao carregar produtos. Por favor, tente novamente mais tarde.");
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    // Atualizar o número de produtos no carrinho quando o carrinho mudar
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCart(storedCartItems);
    }
  }, []);

  // Função para adicionar produto ao carrinho
  const addToCart = (product) => {
    let storedCartItems = JSON.parse(localStorage.getItem('cartItems'));

    // Verificar se storedCartItems é null e inicializá-lo como uma matriz vazia se for
    if (!storedCartItems) {
      storedCartItems = [];
    }

    const existingProductIndex = storedCartItems.findIndex(item => item.product_id === product.product_id);

    if (existingProductIndex !== -1) {
      return;
    } else {
      const updatedProduct = { ...product, quantity: 1 };
      const updatedCart = [...storedCartItems, updatedProduct];

      setCart(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  };

  ///// Contar o número de produtos no carrinho
  const cartItemCount = cart.length;

  ///// Lógica para cálculo dos produtos a serem exibidos na página atual
  const indexOfLastProduct = currentPage * produtosPorPagina;
  const indexOfFirstProduct = indexOfLastProduct - produtosPorPagina;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


  ////// Função para mudar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="products-container">
      <div className="Mysidebar">
        <SideBar cartItemCount={cartItemCount} />
      </div>
      <div className="content-container">
        <div id='BarraBusca'>
          <BarraBusca filteredProducts={currentProducts} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="product-grid">
          {currentProducts.map(product => (
            <div key={product.product_id} className="products-item">
              <img src={product.photo_link} alt={product.name} className="product-images" />
              <div className="products-details">
                <h3 className="products-names">{product.name}</h3>
                <p className="products-prices">€ {product.price}</p>
              </div>
              <button id='BotaoCart' onClick={() => addToCart(product)}>Add Cart</button>
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
