import React, { Component } from 'react'
import FileUploader from 'react-firebase-file-uploader'
import { firebaseApp } from '../firebase/Firebase'

export default class Contagem extends Component {
    constructor(){
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
        console.log ("estomatos")
        var x = event.clientX;
        var y = event.clientY;
        alert("x "+ x + ", y " + y);
        this.setState({
            numeroEstomatos: this.state.numeroEstomatos + 1
        })
    }

    contagemEpidermicas(event) {
        event.preventDefault();
        console.log("celulas ep")
        var x = event.clientX;
        var y = event.clientY;
        alert("x "+ x + ", y " + y);
        this.setState({
            numeroCelulasEp: this.state.numeroCelulasEp + 1
        })
    }

    calcular(){
        var estomatos = this.state.numeroEstomatos
        var celulasep = this.state.numeroCelulasEp
        var soma = estomatos+celulasep
        var total = estomatos/soma
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
            </div>
        );
    }
}