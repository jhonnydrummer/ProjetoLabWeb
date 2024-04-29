import React, { useState, useEffect } from 'react';
import './exibirProdutos.css';
import DeleteProduto from './deletarProduto';


function ExibirProdutos() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [produtosPorPagina] = useState(5); // Número de produtos por página

  
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
            } else {
                console.log('Token não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    fetchProducts();
}, []);

 






///////Função para editar o produto////////
const handleEditeProduto = async (productId) => {
  let mensagemConfirmacao = window.confirm("Tem certeza que quer editar o produto?");

  if (!mensagemConfirmacao) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const updatedData = { };

    const response = await fetch(`https://lwlc-proj-2024.onrender.com/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(updatedData) 
    });

    if (response.ok) {
      // Atualize a interface de usuário conforme necessário
      alert(`Produto com ID ${productId} editado com sucesso.`);
    } else {
      console.error('Erro ao editar produto:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao editar produto:', error);
  }
};

   

  // Lógica para cálculo dos produtos a serem exibidos na página atual
  const indexOfLastProduct = currentPage * produtosPorPagina;
  const indexOfFirstProduct = indexOfLastProduct - produtosPorPagina;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Função para mudar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="product-container">
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
          {currentProducts.map(product => (
            <tr key={product.product_id}>
              <td><img src={product.photo_link} alt={product.name} className="product-image" /></td>
              <td>{product.name}</td>
              <td id='ColunaPreco'>${product.price}</td>
                <td className='areaDeAcao'>
                <button id='BotaoDeletar' onClick={() => DeleteProduto(product.product_id)}>Deletar</button>              
                  <button id='BotaoEditar' >Editar</button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>


      {/* Paginação */}
      <div className="paginacao">
        {Array.from({ length: Math.ceil(products.length / produtosPorPagina) }).map((_, index) => (
          <div key={index}>
            <button className={currentPage === index + 1 ? 'pagina-selecionada' : 'botaoPaginacao'}
        onClick={() => paginate(index + 1)}>
        {index + 1}</button>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  

}

export default ExibirProdutos;
