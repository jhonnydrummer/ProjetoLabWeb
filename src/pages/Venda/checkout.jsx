import React, { useState } from 'react';
import '../style/checkout.css'; // Importa o arquivo de estilos CSS

const Checkout = ({ cart, onCheckout }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleCheckout = () => {
    // Aqui você pode adicionar lógica para finalizar a compra, enviar os dados do cliente, etc.
    onCheckout(customerInfo);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart-info">
        <h3>Detalhes do Carrinho:</h3>
        <ul>
          {cart.map(item => (
            <li key={item.product_id}>
              <span>{item.name}</span>
              <span>Quantidade: {item.quantity}</span>
              <span>Preço: ${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="customer-info">
        <h3>Informações do Cliente:</h3>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={customerInfo.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={customerInfo.email}
          onChange={handleInputChange}
        />
        <textarea
          name="address"
          placeholder="Endereço"
          value={customerInfo.address}
          onChange={handleInputChange}
        />
      </div>
      <button className='btnFinalizarCompra' onClick={handleCheckout}>Finalizar Compra</button>
    </div>
  );
};

export default Checkout;
