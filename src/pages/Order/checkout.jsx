import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/checkout.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(storedCartItems);
  }, []);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = async () => {
    if (!paymentMethod) {
      setErrorMessage("Por favor, selecione um método de pagamento.");
      return;
    }

    const orderData = {
      products: cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      price: calculateTotalPrice(),
      payment_method: paymentMethod,
    };
    
    try {
      const token = localStorage.getItem("token");
    
      const response = await fetch(
        "https://lwlc-proj-2024.onrender.com/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(orderData),
        }
      );
      
      if (!response.ok) {
        throw new Error("Erro ao finalizar o pedido. Tente novamente.");
      }
      
      localStorage.removeItem("cartItems");      
      navigate("/thankYouForBuy");
    } catch (error) {
      setErrorMessage(error.message);
    }

  };

  
  

  /////Calcula o preço total
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCancelar = () => {
    navigate("/cart");
  };




  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-details">
        <div className="cart-info">
          <h3>Detalhes do Carrinho:</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.product_id}>
                <p>ID: {item.product_id}</p>
                <p>Nome: {item.name}</p>
                <p>Preço Unitário: ${item.price}</p>
                <p>Quantidade: {item.quantity}</p>
              </li>
            ))}
          </ul>
          <div className="total">
            <h2>Total: ${calculateTotalPrice()}</h2>
          </div>
        </div>
        <div className="payment-method">
          <h3>Forma de Pagamento:</h3>
          <select
            className="selectPgto"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="">Selecione...</option>
            <option value="cartao">Cartão de Crédito</option>
            <option value="boleto">Multibanco</option>
            <option value="mbway">MbWay</option>
          </select>
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="btnFinalizerEcancelar">
        <button className="btnCancelar" onClick={handleCancelar}>
          Cancelar
        </button>
        <button className="btnFinalizarCompra" onClick={handleCheckout}>
          PAGAR
        </button>
      </div>
    </div>
  );
};

export default Checkout;
