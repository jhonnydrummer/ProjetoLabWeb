import SideBar from '../componentes/sidebar'
import './style/addProduto.css'
import React, { useState } from 'react';


const AddProduto = () => {    
    const [nome, setName] = useState('');
    const [preco, setPreco] = useState('');
    const [produtoImagem, setImagem] = useState('');


    const handleAddImagem = (event) => {
        setImagem(event.target.value.toString().trim());
    };
 


    const handleSalvarProduto = async () => {
        const formData = new FormData();
        formData.append("name", nome);
        formData.append("price", parseInt(preco));
        formData.append("photo_link", produtoImagem);
        const token = localStorage.getItem("token");

    

    const raw = JSON.stringify({
        "name": nome,
        "price": preco, 
        "photo_link": produtoImagem 
      });
      
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token 
        },
        body: raw,
        redirect: "follow"
      };
      
      try {
        const response = await fetch("https://lwlc-proj-2024.onrender.com/products", requestOptions);
        const result = await response.json(); 
        alert("Produto adicionado com sucesso"); 
      } catch (error) {
        console.error(error);
      }
    } 

return (
    <div className="addContainer">
        <div className="Mysidebar">
            <SideBar />
        </div>
        <div id="Add-product-container">
            <div className="inputAdd">
                <div className="containerArquivo">
                    {produtoImagem && <img id='imgAdd' src={produtoImagem} alt="Imagem" />}
                </div>
                <input id="imagemProduto" type="text" onChange={ handleAddImagem} placeholder='Cole o link da imagem aqui'/>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setName(e.target.value)} /> 
                <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
                <button id="botaoSalvar" onClick={handleSalvarProduto}>Salvar</button>
            </div>
        </div>
    </div>
);

}

export default AddProduto;