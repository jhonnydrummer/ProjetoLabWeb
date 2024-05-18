import React, { useState, useEffect } from 'react';
import './style/modoDeVenda.css';
import SideBar from '../componentes/sidebar';
import BarraBusca from '../componentes/BarraBusca';
import Cart from './Order/cart'; 

function ModoDeVenda() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [produtosPorPagina] = useState(10); 
  const [cart, setCart] = useState([]);

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
          setFilteredProducts(data); // Initialize with all products
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
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCart(storedCartItems);
    }
  }, []);

  const addToCart = (product) => {
    let storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProductIndex = storedCartItems.findIndex(item => item.product_id === product.product_id);

    if (existingProductIndex !== -1) {
      return;
    } else {
      const updatedProduct = { ...product, quantity: 1 };
      const updatedCart = [...storedCartItems, updatedProduct];
      setCart(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }

    const msgAddCart = (message) => {
      const messageElement = document.getElementById('productAdd-message');
      messageElement.textContent = message;
      messageElement.style.color = 'red';
      messageElement.style.textAlign = 'center';

      setTimeout(() => {
        messageElement.textContent = ''; 
      }, 2000);
    };

    msgAddCart('Produto adicionado ao carrinho');
  };

  const filterProducts = (searchTerm) => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const cartItemCount = cart.length;
  const indexOfLastProduct = currentPage * produtosPorPagina;
  const indexOfFirstProduct = indexOfLastProduct - produtosPorPagina;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="products-container">
      <div className="Mysidebar">
        <SideBar cartItemCount={cartItemCount} />
      </div>
      <div className="content-container">
        <div id='BarraBusca'>
          <BarraBusca filterProducts={filterProducts} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="product-grid">
          {currentProducts.map(product => (
            <div key={product.product_id} className="products-item">
              <img src={product.photo_link} alt={product.name} className="product-images" />
              <div className="products-details">
                <div className='nome-produto' >
                <h3 className="products-names" >{product.name}</h3>
                </div>
                <p className="products-prices">€ {product.price}</p>
              </div>
              <button id='BotaoCart' onClick={() => addToCart(product)}>Add Cart</button>
            </div>
          ))}
        </div>
        <div id="productAdd-message"></div>
        <div className="MyPaginacao">
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
    </div>
  );
}

export default ModoDeVenda;
