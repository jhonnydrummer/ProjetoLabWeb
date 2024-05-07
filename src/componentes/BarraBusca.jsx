import React, { useState } from 'react';
import BotaoPesquisar from '../img/icons/botaoSearch.png';
import '../pages/style/BarraBusca.css';

const BarraBusca = ({ filteredProducts }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('Todos');

    // Manipulador de mudanças no input
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Manipulador de mudanças no option
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Função para filtrar os produtos com base no texto de busca e na opção selecionada
    const filterProducts = (product) => {
        if (selectedOption === 'Todos' || product.option === selectedOption) {
            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    };

    // Evento de submissão do formulário
    const handleSubmit = (event) => {
        event.preventDefault();
        
        
    };

    return (
        <header>
            <div className='buscar'>
                <h3 id='titulo'>Buscar Produtos</h3>
                <form className='formularioBusca' onSubmit={handleSubmit}>
                    <input
                        className='nome-do-produto'
                        placeholder='Digite o que deseja buscar'
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <select value={selectedOption} onChange={handleSelectChange}>
                        <option value='Todos'>Todos</option>
                        <option value='Recém adicionados'>Recém adicionados</option>
                        <option value='Preço menor para maior'>Menor para Maior</option>
                        <option value='Preço maior para menor'>Maior para Menor</option>
                    </select>
                    <button type="submit" className='botaoSearch' onClick={filterProducts}>
                        <img id='botaoPesquisar' src={BotaoPesquisar} alt="Botão Pesquisar" />
                    </button>
                </form>
            </div>
        </header>
    );
};

export default BarraBusca;
