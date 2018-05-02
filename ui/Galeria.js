import React, { Component } from 'react'
import { firebaseApp, base, storageRef } from '../firebase/Firebase'

export default class Galeria extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fotos: {},
            url: null
        }

        this.listItem = this.listItem.bind(this)
    }
    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged((signedUser) => {
            var uid = signedUser.uid
            var uidString = String(uid)

            base.syncState(uidString + '/imagens', {
                context: this,
                state: 'fotos',
                asArray: false
            })
        })
    }

    listItem(key, foto) {
        storageRef.child('images/' + foto.foto).getDownloadURL().then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            this.setState({
                url: url
            })
        }).catch(function (error) {
            // Handle any errors
        });
        return (
            <div key={key} className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{foto.foto}</h5>
                    <img src={this.state.url} alt='imagem'/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="galeria">
                <h1>Galeria</h1>
                <div className="imagens">
                    {Object
                        .keys(this.state.fotos)
                        .map(key => this.listItem(key, this.state.fotos[key]))}
                </div>

            </div>
        );
    }
}