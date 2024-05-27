const DeleteProduto = async (productId, setProducts) => {
  let mensagemConfirmacao = window.confirm("Tem certeza que quer deletar o Produto?");
  const token = localStorage.getItem('token');  
  
  const Myrequest = {
    method: "DELETE",  
    headers: {
      "Content-Type": "application/json",
      'Authorization': token,
    }
  };

  if (!mensagemConfirmacao) {
    return;
  }

  try {
    const response = await fetch(`https://lwlc-proj-2024.onrender.com/products/${productId}`, Myrequest);
    if (!response.ok) {
      throw new Error('Erro ao deletar produto:');
    }
    alert('Produto deletado com sucesso.');

    ////////////Atualiza os produtos removendo o produto deletado
    setProducts(prevProducts => prevProducts.filter(product => product.product_id !== productId));
  } catch (error) {
    console.error(error);
  }
};

export default DeleteProduto;
