import React, { Component } from 'react';
// import { Link } from 'react-router'

export default class Card extends Component {
    render(props) {
        return (
            <div class="card" style={{width: "18rem"}}>
                <img class="card-img-top" src=".../100px180/" alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title">{this.props.nome}</h5>
                    <p class="card-text">{this.props.descricao}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        );
    };
}
