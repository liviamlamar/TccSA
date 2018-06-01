import React, { Component } from 'react'
import FileUploader from 'react-firebase-file-uploader'
// import firebase from 'firebase'
import { firebaseApp, base } from '../firebase/Firebase'
import { idProjeto } from '../ui/Projetos'
import Pin from '../components/Pin'
import './Contagem.css'

const style = {
    foto: {
        width: "100%",
        height: "100%"
    },

    modal: {
        backgroundColor: "#fff",
        opacity: "0.80",
        MozOpacity: "0.80",
        filter: "alpha(opacity=80)",
        display: "flex",
        flexDirection: "column"
    }
}

var uid = null

export default class Contagem extends Component {
    constructor(props) {
        super(props)

        this.pin = 0

        this.state = {
            marcadores: [], // Array onde serão guardados os estados de cada marcado (posição no eixo X, posição no eixo Y, contador, display)
            counter: 0,
            containerWidth: 0,
            containerHeight: 0,
            numeroEstomatos: 0,
            numeroCelulasEp: 0,
            resultado: 0,
            densidade: 0
        }

        this.contagemEstomatos = this.contagemEstomatos.bind(this)
        this.contagemEpidermicas = this.contagemEpidermicas.bind(this)
        this.calcularIndice = this.calcularIndice.bind(this)
        this.calcularDensidade = this.calcularDensidade.bind(this)
        this.handlePosition = this.handlePosition.bind(this)
    }

    state = {
        foto: '',
        isUploading: false,
        progress: 0,
        fotoURL: ''
    };

    componentDidMount = () => {
        firebaseApp.auth().onAuthStateChanged((signedUser) => {
            uid = signedUser.uid
        }
        )
    }

    handlePosition = () => {
        const w = (this.img.offsetWidth - this.state.containerWidth) / 3 || 0
        console.log(w)
        const h = (this.img.offsetHeight - this.state.containerHeight) / 2 || 0

        console.log(this.container.offsetHeight, this.img.offsetHeight)
        this.setState({
            posX: this.state.posX + w,
            posY: this.state.posY + (h),
            containerWidth: this.img.offsetWidth,
            containerHeight: this.img.offsetHeight
        })
    }

    mostrarPin = ( key_marcador ) => {
        return (
          <Pin 
            refValue={ ref => this.pin = ref } 
            counter={ this.state.marcadores[key_marcador].counter } 
            posX={`${ this.state.marcadores[key_marcador].posX }px`} 
            posY={`${ this.state.marcadores[key_marcador].posY }px`} 
            display={ this.state.marcadores[key_marcador].display } />
        )
      }

    contagemEstomatos = (e) => {
        e.preventDefault();
        console.log("estomatos")

        const offW = this.pin.offsetWidth || 29
        const offY = this.pin.offsetHeight || 29
        // A cada clique na imagem um objeto é gerado com os dados abaixo relacionados
        const marcador = {
            posX: (e.clientX - (offW / 2)) - 41,
            posY: (e.clientY - (offY / 2)) - 5,
            counter: this.state.numeroEstomatos + 1,
            display: 'block'
        }

        // Altero o estado do array macadores acrescentando o novo objeto e atualizo o contador.
        this.setState({
            counter: this.state.counter + 1,
            marcadores: [...this.state.marcadores, marcador],
            numeroEstomatos: this.state.numeroEstomatos + 1
        })

        
        this.calcularIndice()
    }

    contagemEpidermicas = (e) => {
        e.preventDefault();
        console.log("celulas ep")
        const offW = this.pin.offsetWidth || 29
        const offY = this.pin.offsetHeight || 29
        // A cada clique na imagem um objeto é gerado com os dados abaixo relacionados
        const marcador = {
            posX: (e.clientX - (offW / 2)) - 41,
            posY: (e.clientY - (offY / 2)) - 5,
            counter: this.state.numeroCelulasEp + 1,
            display: 'block'
        }

        // Altero o estado do array macadores acrescentando o novo objeto e atualizo o contador.
        this.setState({
            counter: this.state.counter + 1,
            marcadores: [...this.state.marcadores, marcador],
            numeroCelulasEp: this.state.numeroCelulasEp + 1
        })

        
        this.calcularIndice()
    }

    calcularIndice() {
        var estomatos = this.state.numeroEstomatos
        var celulasep = this.state.numeroCelulasEp
        var soma = estomatos + celulasep
        var divisao = estomatos / soma
        var total = divisao * 100
        this.setState({
            resultado: total
        })
    }

    calcularDensidade() {
        var estomatos = this.state.numeroEstomatos
        var area = this.refs.area.value
        var densidade = estomatos / area
        this.setState({
            densidade: densidade
        })
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = (progress) => this.setState({ progress });
    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        console.error(error);
    }
    handleUploadSuccess = (filename, key) => {
        this.setState({ foto: filename, progress: 100, isUploading: false, key: key });
        firebaseApp.storage().ref('/imagens').child(filename).getDownloadURL().then(url => this.setState({ fotoURL: url })

        );

        const foto = this.state.foto

        base.push(uid + '/' + idProjeto + '/imagens', {
            data: {
                foto
            }
        })
    };

    render() {
        return (
            <div>
                <div className="container-foto" ref={ref => this.container = ref}>
                    {this.state.isUploading &&
                        <progress>{this.state.progress}</progress>
                    }

                    {this.state.fotoURL &&
                        <img src={this.state.fotoURL}
                            ref={ref => this.img = ref}
                            onClick={this.contagemEstomatos}
                            onContextMenu={this.contagemEpidermicas}
                            style={style.foto}
                            alt="foto" />
                    }


                     {/* Percorre o array de objetos dos marcadores e mostro eles na tela. */}
                    {
                        Object
                            .keys(this.state.marcadores)
                            .map(key => this.mostrarPin(key, this.state.marcadores[key]))
                    }


                    <FileUploader
                        accept="image/*"
                        id="botaoFoto"
                        name="foto"
                        ref={ref => this.img = ref}
                        randomizeFilename
                        storageRef={firebaseApp.storage().ref('/imagens')}
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

                                <label className="col-form-label">C. Epidérmicas: {this.state.numeroCelulasEp}</label>

                                <label className="col-form-label" style={{ marginRight: "30px" }}>Índice: {this.state.resultado}</label>

                                <label className="col-form-label" style={{ marginRight: "5px" }}>Insira a área: </label>
                                <input ref="area" name="area" type="number" style={{ width: "60px" }} />
                                <button type="button" className="btn btn-primary" onClick={this.calcularDensidade}>Calcular Densidade</button>
                                <label className="col-form-label">Densidade: {this.state.densidade}</label>
                                {/* <button type="button" className="btn btn-primary" onClick={this.salvarDados}>Salvar</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* MODAL */}

            </div>
        );
    }
}
