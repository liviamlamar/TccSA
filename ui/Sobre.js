import React, { Component } from 'react'

import criarProjeto1 from '../imgs/passo1.png'
import criarProjeto2 from '../imgs/passo2.png'
import visualizarProjeto from '../imgs/passo3.png'
import editarProjeto from '../imgs/passo4.png'
import excluirProjeto from '../imgs/passo5.png'
import pagSobre1 from '../imgs/passo6.png'
import pagEstomatos1 from '../imgs/passo7.png'

import './Texto.css'

const style = {
    imagem: {
        width: "500px"
    }
}

export default class Sobre extends Component {
    render() {
        return (
            <div className="container">
                <h1 id="title">Sobre</h1>
                <div id="texto">
                    <p> Stoma Analyzer é uma aplicação web desenvolvida por Lívia de Morais Lamar e Danielli Santos Siqueira, sob orientação e coorientação de André Violin e Fernanda Soares Junglos, respectivamente, como trabalho de conclusão de curso Técnico em Informática.</p>
                    <h2 id="sub-title">Modo de uso:</h2>
                    <h2 id="sub-title">Criação de projeto:</h2>
                    <img id="imagem" src={criarProjeto1} alt="figura1" style={style.imagem}></img>
                    <img id="imagem" src={criarProjeto2} alt="figura2" style={style.imagem}></img>
                    <h2 id="sub-title">Visualização do projeto:</h2>
                    <img id="imagem" src={visualizarProjeto} alt="figura1" style={style.imagem}></img>
                    <h2 id="sub-title">Editar projeto:</h2>
                    <img id="imagem" src={editarProjeto} alt="figura1" style={style.imagem}></img>
                    <h2 id="sub-title">Excluir projeto:</h2>
                    <img id="imagem" src={excluirProjeto} alt="figura1" style={style.imagem}></img>
                    <h2 id="sub-title">Ir para página Sobre:</h2>
                    <img id="imagem" src={pagSobre1} alt="figura1" style={style.imagem}></img>
                    <h2 id="sub-title">Ir para página Estômatos:</h2>
                    <img id="imagem" src={pagEstomatos1} alt="figura1" style={style.imagem}></img>
                </div>
            </div>
        )
    }
}