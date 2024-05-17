const HandleDeleteOrder = async (orderId, setOrders) => {
    const mensagemConfirmacao = window.confirm(`Tem certeza que quer deletar o pedido de ID ${orderId}?`);
    const token = localStorage.getItem('token');
  
    if (!mensagemConfirmacao) {
      return;
    }
  
    const Myrequest = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token,
      }
    };
  
    try {
      const response = await fetch(`https://lwlc-proj-2024.onrender.com/orders/${orderId}`, Myrequest);
      if (!response.ok) {
        throw new Error('Erro ao deletar pedido:');
      }
      console.log('Pedido deletado com sucesso.');
  
      // Atualizar o estado para remover a ordem deletada
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error(error);
    }
  };
  
  export default HandleDeleteOrder;
  