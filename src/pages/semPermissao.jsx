import React, { useState, useEffect } from "react";
import "./style/modoDeVenda.css";
import SideBar from "../componentes/sidebar";
import BarraBusca from "../componentes/BarraBusca";
import "../pages/style/semPermissao.css";

function SemPermissao() {
  return (
    <div id="bodyContainer">
      <div className="products-container">
        <div className="Mysidebar">
          <SideBar />
        </div>
        <div className="content-container">
          <div id="BarraBusca">
            <BarraBusca />
          </div>
          <div id="imagemDeFundo">
            <div className="TextoPermissao">
              <h3>Você não tem permissão para acessar esta funcionalidade!</h3>

              <h4>Você não é um administrador!</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SemPermissao;
