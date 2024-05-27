import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/visualizarPedidos.css";
import SideBar from "../../componentes/sidebar";
import HandleDeleteOrder from "../Order/deletarPedido";

function VisualizarPedidos() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPorPagina] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await fetch(
            "https://lwlc-proj-2024.onrender.com/orders",
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const data = await response.json();
          setOrders(data);
        } else {
          console.log("Token não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        setError("Erro ao buscar pedidos.");
      }
    }
    fetchOrders();
  }, []);

  ////Função para atualizar o status do pedido
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://lwlc-proj-2024.onrender.com/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o status da ordem.");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      );

      function msgStatus(message) {
        const messageElement = document.getElementById('update-message');
        messageElement.textContent = message;
        messageElement.style.color = 'red';
        messageElement.style.textAlign = 'end';
      
        setTimeout(() => {
          messageElement.textContent = ''; 
        }, 3000);
      }         
      
      msgStatus('Status atualizado com sucesso');
    } catch (error) {
      console.error("Erro ao atualizar o status da ordem:", error);
    }
  };

  // Lógica para cálculo dos pedidos a serem exibidos na página atual
  const indexOfLastOrder = currentPage * ordersPorPagina;
  const indexOfFirstOrder = indexOfLastOrder - ordersPorPagina;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

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
                <th>Cliente</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.description}</td>
                  <td>{new Date(order.date_time).toLocaleDateString()}</td>
                  <td>€{order.total_price}</td>
                  <td>{order.payment_method}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.order_id, e.target.value)
                      }
                    >
                      <option value="pending" defaultValue>Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>                    
                  </td>
                  <td>{order.username}</td>
                  <td>
                    <button
                      onClick={() =>
                        HandleDeleteOrder(order.order_id, setOrders)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        <div id="update-message"></div>
        <div className="pagination">
          {Array.from({
            length: Math.ceil(orders.length / ordersPorPagina),
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

export default VisualizarPedidos;
