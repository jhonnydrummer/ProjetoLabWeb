const HandleDeleteOrder = async (orderId, setOrders) => {
    let mensagemConfirmacao = window.confirm("Tem certeza que quer deletar a order?");
    const token = localStorage.getItem('token');  

    const Myrequest = {
      method: "DELETE",  
      headers: {
        "Content-Type": "application/json",
        'Authorization': token,
      }
    };

    if(!mensagemConfirmacao){
      return;
    }

    try {
      const response = await fetch(`https://lwlc-proj-2024.onrender.com/orders/${orderId}`, Myrequest);
      if (!response.ok) {
        throw new Error('Erro ao deletar order:');
      }
      console.log('Order deletada com sucesso.');
      // Atualize as ordens removendo a ordem deletada
      setOrders(prevOrders => prevOrders.filter(order => order.order_id !== orderId));
    } catch (error) {
      console.error(error);
    }
};

export default HandleDeleteOrder;
