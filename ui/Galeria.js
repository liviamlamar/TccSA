import React, { Component } from 'react'
import { firebaseApp, storage, base } from '../firebase/Firebase'
import { idProjeto } from '../ui/Projetos'
import Card from '../components/Card'

var uid = null

export default class Galeria extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fotos: {},
            urlVetor: [],
            url: ''
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
                asArray: true
            })
        })
    }

    listItem(key, fotos) {
        console.log(fotos.foto)
        var url;
        storage.child(`imagens/${fotos.foto}`).putString(`data_url`).then((snapshot) => {
            console.log('Uploaded a data_url string!');
            url = snapshot.downloadURL;
            console.log(url)
            return (
                <Card key={key} url={url}/>
            )
        });

       
        
    }


    
        // console.log(fotos.foto)
        // firebaseApp.storage().ref('/imagens').child(fotos.foto).getDownloadURL()
        //     .then(url => this.setState({
        //         url
        //     })
        //     );
        //     this.state.urlVetor.push(this.state.url)


        //    storage.child(`imagens/${fotos.foto}`).getDownloadURL()
        //         .then( url => {
        //             console.log(url)
        //             return (
        //                 <div className="col-mb-3" style={{marginRight:'10px'}}>
        //                 <div key={key} className="card" style={{ maxWidth: "18rem", marginBottom:"10px" }}>
        //                     <div className="card-body">
        //                         <img src={url} alt='imagem' style={{width: "16rem"}}/>
        //                     </div>
        //                 </div>
        //                 </div>
        //             )
        //         } )

        // storage.child(`imagens/${fotos.foto}`).getDownloadURL()
        // .then( url => this.setState({url}))
        // return (
        //     <div className="col-mb-3" style={{marginRight:'10px'}}>
        //     <div key={key} className="card" style={{ maxWidth: "18rem", marginBottom:"10px" }}>
        //         <div className="card-body">
        //             <img src={this.state.url} alt='imagem' style={{width: "16rem"}}/>
        //         </div>
        //     </div>
        //     </div>
        // )


        // return (
        //     <div className="col-mb-3" style={{ marginRight: '10px' }}>
        //         <div key={key} className="card" style={{ maxWidth: "18rem", marginBottom: "10px" }}>
        //             <div className="card-body">
        //                 <img src={snapshot.downloadURL} alt='imagem' style={{ width: "16rem" }} />
        //             </div>
        //         </div>
        //     </div>
        // )
        //add it to firestore


    //}

    render() {
        return (
            <div className="galeria">
                <h1>Galeria</h1>
                <div className="imagens row" style={{ marginLeft: '45px' }}>
                    {Object
                        .keys(this.state.fotos)
                        .map(key => this.listItem(key, this.state.fotos[key]))}
                </div>

            </div>
        );
    }
}