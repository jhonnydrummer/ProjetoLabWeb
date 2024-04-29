const HandleDeleteProduto = async (productId) => {
    let mensagemConfirmacao = window.confirm("Tem certeza que quer deletar o produto?")
    const token = localStorage.getItem('token');  
    
    const Myrequest = {
      method: "DELETE",  
      headers: {
        "Content-Type": "application/json",
        'Authorization': token,
      }
    };
  
    if(!mensagemConfirmacao){
      return; // Retorna se o usuário cancelar a confirmação
    }
  
    try {
      const response = await fetch(`https://lwlc-proj-2024.onrender.com/products/${productId}`, Myrequest);
      if (!response.ok) {
        throw new Error('Erro ao deletar produto: ' + response.statusText);
      }
      console.log('Produto deletado com sucesso.');
    } catch (error) {
      console.error(error);
    }
};

export default HandleDeleteProduto;
