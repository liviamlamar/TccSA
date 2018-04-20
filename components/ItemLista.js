import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ItemLista extends Component{
    render(props){
        return(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to={this.props.link}>
                        <img className={this.props.imgClassName} src={this.props.imgSrc} alt={this.props.imgAlt}/>
                        {this.props.texto}
                    </Link>
                </li>
            </ul>
        )
    }
}