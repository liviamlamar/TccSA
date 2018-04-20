import React, { Component } from 'react'

import Logo from '../imgs/logo.png'
import SobreIcon from '../imgs/abouticon.svg'
import EstomatosIcon from '../imgs/leaficon.svg'

import './SideBar.css'
import ItemLista from './ItemLista.js'

export default class SideBar extends Component {
    render(props) {
        const path = window.location.pathname;
        return (
            <nav className="navbar fixed left">
                <a className="navbar-brand" href="/projetos">
                    <img className="logo fixed top left" src={Logo} alt="logo"/>
                </a>
                
                (path === "/projetos" &&
                <ItemLista 
                      link="/sobre" 
                      nomeClasse="icon"
                      urlIcon={SobreIcon}
                      nomeIcon="sobreicon"
                      texto="Sobre"
                />

                <ItemLista 
                      link="/estomatos" 
                      nomeClasse="icon"
                      urlIcon={EstomatosIcon}
                      nomeIcon="estomatosicon"
                      texto="Estômatos"
                />
                )

            </nav>
        )
    }
}