import React from "react";
import SideBar from "../componentes/sidebar";
import "../pages/style/suporte.css";

function FAQ() {
  return (
    <div className="faq-main-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="faq-container">
        <h2 className="faq-title">Perguntas Frequentes</h2>
        <div className="faq-item">
          <h3>Como faço para fazer um pedido?</h3>
          <p>
            Você pode fazer um pedido navegando pela loja, adicionando os produtos desejados ao carrinho e, em seguida, seguindo para o checkout para concluir a compra.
          </p>
        </div>
        <div className="faq-item">
          <h3>Quais métodos de pagamento são aceitos?</h3>
          <p>
            A loja aceita os seguintes métodos de pagamento: cartão de crédito, cartão de débito, PayPal e transferência bancária.
          </p>
        </div>
        <div className="faq-item">
          <h3>Como posso rastrear meu pedido?</h3>
          <p>
            Assim que seu pedido for enviado, você receberá um e-mail com um link de rastreamento. Você também pode acessar sua conta na loja para verificar o status do pedido e obter o código de rastreamento.
          </p>
        </div>
        <div className="faq-item">
          <h3>Posso devolver um produto?</h3>
          <p>
            Sim, você pode devolver um produto dentro de 30 dias após a compra, desde que esteja em sua condição original e não tenha sido usado. Consulte nossa política de devolução para obter mais informações.
          </p>
        </div>
        <div className="faq-item">
          <h3>Como entro em contato com o suporte ao cliente?</h3>
          <p>
            Você pode entrar em contato com nosso suporte ao cliente ligando para o número XXX-XXX-XXXX ou enviando um e-mail para <strong>support@marketshop.com.</strong> Nossa equipe terá prazer em ajudá-lo com qualquer dúvida ou preocupação.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
