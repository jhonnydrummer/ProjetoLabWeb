import { useNavigate } from 'react-router-dom';
import '../style/thankYouForBuy.css';
import Logomarca from '../../img/logo_escuro.png'

const ThankYouForBuy = () => {
  const navigate = useNavigate();

  const IrParaHome = () => {
    navigate("/modo-de-venda");
  };

  return (
    <div className="checkout-container">
      <div className='container-text-button'>
        <img id='myLogo' src={Logomarca}/>
      <h3>Compra efetuada com sucesso!!</h3>
        <h1>AGRADECEMOS PELA COMPRA!</h1>
        <h3>Volte sempre!</h3>
      
      
      
        <button className='btnIrParaHome' onClick={IrParaHome}>Voltar para Home</button>
        </div>
         </div>
  );
};

export default ThankYouForBuy;
