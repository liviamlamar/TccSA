import React, { Component } from 'react'
import { Link } from 'react-router'

import SideBar from '../components/SideBar'

export default class Projetos extends Component{
    render(){
        return(
            <div>
                <SideBar/>
                <Link to="/projetos/galeria">Projeto</Link>
            </div>
        )
    }
}