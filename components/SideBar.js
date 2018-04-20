import React, { Component } from 'react'

import Logo from '../imgs/logo.png'
import SobreIcon from '../imgs/abouticon.svg'
import EstomatosIcon from '../imgs/leaficon.svg'
import GaleriaIcon from '../imgs/galleryicon.svg'
import ContagemIcon from '../imgs/conticon.svg'

import './SideBar.css'
import ItemLista from './ItemLista.js'

export default class SideBar extends Component {
    render() {
        const path = window.location.pathname;
        return (
            <nav className="navbar fixed left">
                <a className="navbar-brand" href="/projetos">
                    <img className="logo fixed top left" src={Logo} alt="logo"/>
                </a>
                
                {path === "/projetos" &&
                <div>
                    <ItemLista 
                    link="/sobre" 
                    imgClassName="icon"
                    imgSrc={SobreIcon}
                    imgAlt="sobreicon"
                    texto="Sobre"
                />

                <ItemLista 
                    link="/estomatos" 
                    imgClassName="icon"
                    imgSrc={EstomatosIcon}
                    imgAlt="estomatosicon"
                    texto="Estômatos"
                />
                </div>
                }

                {path === "/sobre" &&
                <div>
                    <ItemLista 
                    link="/sobre" 
                    imgClassName="icon"
                    imgSrc={SobreIcon}
                    imgAlt="sobreicon"
                    texto="Sobre"
                />

                <ItemLista 
                    link="/estomatos" 
                    imgClassName="icon"
                    imgSrc={EstomatosIcon}
                    imgAlt="estomatosicon"
                    texto="Estômatos"
                />
                </div>
                }

                {path === "/estomatos" &&
                <div>
                    <ItemLista 
                    link="/sobre" 
                    imgClassName="icon"
                    imgSrc={SobreIcon}
                    imgAlt="sobreicon"
                    texto="Sobre"
                />

                <ItemLista 
                    link="/estomatos" 
                    imgClassName="icon"
                    imgSrc={EstomatosIcon}
                    imgAlt="estomatosicon"
                    texto="Estômatos"
                />
                </div>
                }

                {path === "/projetos/galeria" &&
                <div>
                    <ItemLista 
                    link="/galeria" 
                    imgClassName="icon"
                    imgSrc={GaleriaIcon}
                    imgAlt="galeriaicon"
                    texto="Galeria"
                />

                <ItemLista 
                    link="/contagem" 
                    imgClassName="icon"
                    imgSrc={ContagemIcon}
                    imgAlt="contagemicon"
                    texto="Contagem"
                />
                </div>
                }

                {path === "/projetos/contagem" &&
                <div>
                    <ItemLista 
                    link="/galeria" 
                    imgClassName="icon"
                    imgSrc={GaleriaIcon}
                    imgAlt="galeriaicon"
                    texto="Galeria"
                />

                <ItemLista 
                    link="/contagem" 
                    imgClassName="icon"
                    imgSrc={ContagemIcon}
                    imgAlt="contagemicon"
                    texto="Contagem"
                />
                </div>
                }
            </nav>
        )
    }
}