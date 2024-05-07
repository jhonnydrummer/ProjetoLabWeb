import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../componentes/sidebar';
import '../style/addProduto.css';

const PaginaEditarProduto = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [nome, setNome] = useState(''); 
    const [preco, setPreco] = useState(''); 
    const [produtoImagem, setImagem] = useState(''); 
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProductData() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://lwlc-proj-2024.onrender.com/products/${productId}`, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': token,
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao obter dados do produto');
                }

                const data = await response.json();
                const productData = data[0];
                setProduct(productData);
                setNome(productData.name); 
                setPreco(productData.price); 
                setImagem(productData.photo_link);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchProductData();
    }, [productId]);

    const handleSalvarEdicaoProduto = async () => {
        try {
            // Validação de entrada
            if (!nome || !preco || !produtoImagem) {
                throw new Error('Por favor, preencha todos os campos');
            }

            const token = localStorage.getItem('token');
            const response = await fetch(`https://lwlc-proj-2024.onrender.com/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    name: nome,
                    price: preco,
                    photo_link: produtoImagem
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar as alterações');
            }

            setSuccessMessage('Produto editado com sucesso');
        } catch (error) {
            setError(error.message);
        }
    };

    const cancelarEdicao = () => {
        navigate('/gerenciar-produtos');
    };

    return (
        <div className="addContainer">
            <div className="Mysidebar">
                <SideBar />
            </div>
            <div id="Add-product-container">
            
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                {product && (
                    <div className="inputAdd">
                        <button id="botaoX" onClick={cancelarEdicao}>X</button>
                        <div className="containerArquivo">
                            {produtoImagem && <img id='imgAdd' src={produtoImagem} alt="Imagem" />}
                        </div>
                        <input id="imagemProduto" type="text" value={produtoImagem} placeholder='Cole o link da imagem aqui'
                                 onChange={(e) => setImagem(e.target.value)} />
                        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} /> 
                        <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
                        <button id="botaoSalvar" onClick={handleSalvarEdicaoProduto}>Salvar</button>
                        <button id="botaoCancelar" onClick={cancelarEdicao}>Cancelar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaginaEditarProduto;
