import React, { Component } from 'react'
import FileUploader from 'react-firebase-file-uploader'
import firebase from 'firebase'
import { firebaseApp, base } from '../firebase/Firebase'
// import Test from '../components/Test'

const style = {
    foto: {
        width: "100%",
        height: "100%",
        marginLeft: "50px"
    },

    modal: {
        backgroundColor: "#fff",
        opacity:"0.80",
        MozOpacity: "0.80",
        filter: "alpha(opacity=80)"
    }
}

export default class Contagem extends Component {
    constructor() {
        super()

        this.state = {
            numeroEstomatos: 0,
            numeroCelulasEp: 0,
            resultado: 0
        }
        this.contagemEstomatos = this.contagemEstomatos.bind(this)
        this.contagemEpidermicas = this.contagemEpidermicas.bind(this)
        this.calcular = this.calcular.bind(this)


    }

    state = {
        foto: '',
        isUploading: false,
        progress: 0,
        fotoURL: ''
    };


    contagemEstomatos(event) {
        event.preventDefault();
        console.log("estomatos")
        var x = event.clientX;
        var y = event.clientY;
        alert("x " + x + ", y " + y);
       
        this.setState({
            numeroEstomatos: this.state.numeroEstomatos + 1
        })
        this.calcular()
    }

    contagemEpidermicas(event) {
        event.preventDefault();
        console.log("celulas ep")
        var x = event.clientX;
        var y = event.clientY;
        alert("x " + x + ", y " + y);
        this.setState({
            numeroCelulasEp: this.state.numeroCelulasEp + 1
        })
        this.calcular()
    }

    calcular() {
        var estomatos = this.state.numeroEstomatos
        var celulasep = this.state.numeroCelulasEp
        var soma = estomatos + celulasep
        var divisao = estomatos / soma
        var total = divisao * 100
        this.setState({
            resultado: total
        })
    }


    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = (progress) => this.setState({ progress });
    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({ foto: filename, progress: 100, isUploading: false });
        firebaseApp.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({ fotoURL: url }));
        var user = firebase.auth().currentUser;
        var uid;

        if (user != null) {
            uid = user.uid;
        }

        const foto = this.state.foto
        base.push(uid + '/imagens', {
            data: {
                foto
            }
        })
    };


    render() {
        return (
            <div>
                <div className="calcular-container">
                    {this.state.isUploading &&
                        <progress>{this.state.progress}</progress>
                    }


                    {this.state.fotoURL &&
                        <img src={this.state.fotoURL}
                            onClick={this.contagemEstomatos}
                            onContextMenu={this.contagemEpidermicas}
                            style={style.foto}
                            alt="foto" />
                    }

                    <FileUploader
                        accept="image/*"
                        id="botaoFoto"
                        name="foto"
                        randomizeFilename
                        storageRef={firebaseApp.storage().ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                </div>


                {/* MODAL */}
                <div className="modal fade col-md-2 ml-auto" id="dadosContagem" tabIndex="-1" role="dialog" aria-labelledby="dadosContagemLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={style.modal}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="dadosContagemLabel">Dados</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ textAlign: "justify" }}>
                                <label className="col-form-label">Estomâtos: {this.state.numeroEstomatos}</label>
                                {/* <label id="cont-estomatos" sytle={style.label}> {this.state.numeroEstomatos} </label> */}

                                <label className="col-form-label">C. Epidérmicas: {this.state.numeroCelulasEp}</label>
                                {/* <label id="cont-celulasep" sytle={style.label}> {this.state.numeroCelulasEp} </label> */}

                                <label className="col-form-label">Resultado: {this.state.resultado}</label>
                                {/* <label id="cont-resultado" sytle={{ paddinLeft: "10px" }}> {this.state.resultado} </label> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* MODAL */}

            </div>
        );
    }
}