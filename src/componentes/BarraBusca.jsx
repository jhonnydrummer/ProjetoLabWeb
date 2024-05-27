import React, { useState } from 'react';
import BotaoPesquisar from '../img/icons/botaoSearch.png';
import '../pages/style/BarraBusca.css';

const BarraBusca = ({ filterProducts }) => {
    const [myPesquisa, setMyPesquisa] = useState('');

    // Manipulador de mudanças no input
    const handleInputChange = (event) => {
        setMyPesquisa(event.target.value);
    };

    // Evento de submissão do formulário
    const handleSubmit = (event) => {
        event.preventDefault();
        filterProducts(myPesquisa);
    };

    return (
        <header>
            <div className='buscar'>
                <h3 id='titulo'>Buscar Produtos</h3>
                <form className='formularioBusca' onSubmit={handleSubmit}>
                    <input
                        className='nome-do-produto'
                        placeholder='Digite o que deseja buscar'
                        value={myPesquisa}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className='botaoSearch'>
                        <img id='botaoPesquisar' src={BotaoPesquisar} alt="Botão Pesquisar" />
                    </button>
                </form>
            </div>
        </header>
    );
};

export default BarraBusca;
