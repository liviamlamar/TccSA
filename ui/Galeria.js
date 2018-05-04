import React, { Component } from 'react'
import { firebaseApp, base, storage } from '../firebase/Firebase'
import { idProjeto } from '../ui/Projetos'

var uid = null

export default class Galeria extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fotos: {},
            url: {}
        }

        this.listItem = this.listItem.bind(this)
    }
    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged((signedUser) => {
            uid = signedUser.uid
            var uidString = String(uid)
            var keyString = String(idProjeto)
            base.syncState(uidString + '/' + keyString + '/imagens', {
                context: this,
                state: 'fotos',
                asArray: false
            })
        })
    }

    listItem(key, foto) {
        firebaseApp.storage().ref('/imagens').child(foto.foto).getDownloadURL()
            .then(url => this.setState({
                url: {
                    url
                }
            })
            );


        return (
            <div key={key} className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                <p>{key}</p>
                    <img src={this.state.url} alt='imagem' style={{width: "16rem"}}/>
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