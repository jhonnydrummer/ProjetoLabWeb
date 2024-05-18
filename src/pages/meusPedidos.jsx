import React, { useState, useEffect } from "react";
import "..//pages/style/visualizarPedidos.css";
import SideBar from "../componentes/sidebar";

function VisualizarMeusPedidos() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPorPagina] = useState(12);

  useEffect(() => {
    const ordersFromLocalStorage = JSON.parse(localStorage.getItem("orders")) || [];
    setOrderHistory(ordersFromLocalStorage);
  }, []);

  // Lógica para cálculo dos pedidos a serem exibidos na página atual
  const indexOfLastOrder = currentPage * ordersPorPagina;
  const indexOfFirstOrder = indexOfLastOrder - ordersPorPagina;
  const currentOrders = orderHistory.slice(indexOfFirstOrder, indexOfLastOrder);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <SideBar />
      <div className="orders-content">
        {error && <p className="error-message">{error}</p>}
        <div className="container-orders-b">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Data</th>
                <th>Preço Total</th>
                <th>Método de Pagamento</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.orderId}</td>
                  {order.products.map((product, index) => (                                  
                      
                        <tr key={index}>
                          <td>{product.product_id}</td>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                        </tr>                      
                  
                  ))}
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>€{order.price}</td>
                  <td>{order.payment_method}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="update-message"></div>
        <div className="pagination">
          {Array.from({
            length: Math.ceil(orderHistory.length / ordersPorPagina),
          }).map((_, index) => (
            <button
              key={index}
              className={
                currentPage === index + 1
                  ? "pagina-selecionada"
                  : "botaoPaginacao"
              }
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VisualizarMeusPedidos;
