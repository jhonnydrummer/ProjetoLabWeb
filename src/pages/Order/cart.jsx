import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../componentes/sidebar";
import "../../pages/style/cart.css";
import Checkout from './checkout'




function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Função para remover um produto do carrinho
  const removeFromCart = (productId) => {
    const itemIndex = cartItems.findIndex((item) => item.product_id === productId);
    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(itemIndex, 1);
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };



  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  ////Função para obter o valor total
  function valorTotal() {
    let total = 0;

    cartItems.forEach((item) => {
      total += item.price * item.quantity;      
    });

    return total;
  }

  

  const handleCheckout = () => {
    let itemIndex = cartItems.findIndex((item) => item.product_id);
    if(!itemIndex){
      navigate("/checkout");
    }
    function msgError(message) {
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement.textContent = message;
      errorMessageElement.style.color = 'red';
    }    
    // Exemplo de uso
    msgError('Carrinho vazio. Impossível prosseguir.');

    return;
  }

  return (
    <div className="container-geral">
      <SideBar />
      <div className="containerCart">
        <h2 id="titulo-cart">Carrinho de Compras</h2>
        <div className="cart-items">
        <div className="Container-produtos-cart">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço €</th>
                <th>Quantidade</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (              
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>€{item.price}</td>
                  <td>
                    <button
                      className="quantity-button"
                      onClick={() => {
                        if (item.quantity > 1) {
                          const updatedCart = [...cartItems];
                          updatedCart[index] = {
                            ...updatedCart[index],
                            quantity: updatedCart[index].quantity - 1,
                          };
                          setCartItems(updatedCart);
                          localStorage.setItem(
                            "cartItems",
                            JSON.stringify(updatedCart)
                          );
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      className="inputQuantity"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        let newQuantity = parseInt(e.target.value);
                        newQuantity =
                          isNaN(newQuantity) || newQuantity < 1
                            ? 1
                            : newQuantity;
                        const updatedCart = cartItems.map((cartItem, idx) =>
                          idx === index
                            ? { ...cartItem, quantity: newQuantity }
                            : cartItem
                        );
                        setCartItems(updatedCart);
                        localStorage.setItem(
                          "cartItems",
                          JSON.stringify(updatedCart)
                        );
                      }}
                    />
                    <button
                      className="quantity-button"
                      onClick={() => {
                        const updatedCart = cartItems.map((cartItem, idx) =>
                          idx === index
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                        );
                        setCartItems(updatedCart);
                        localStorage.setItem(
                          "cartItems",
                          JSON.stringify(updatedCart)
                        );
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.product_id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <h3 className="valorTotal">
            Valor total:{" "}
            <h2>
              €
              {valorTotal().toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </h2>
          </h3>
          <div id="error-message"></div>
        </div>
        <button className="btnCheckOut" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
