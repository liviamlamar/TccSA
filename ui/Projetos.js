import React, { Component } from 'react'
import { Link } from 'react-router'
import { base, firebaseApp } from '../firebase/Firebase'

var idProjeto = null
var uid = null

export default class Projetos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projetos: {},
            key: null
        }

        this.listItem = this.listItem.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.getThisItem = this.getThisItem.bind(this)
        this.openProject = this.openProject.bind(this)
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged((signedUser) => {
            uid = signedUser.uid
            var uidString = String(uid)

            base.syncState(uidString, {
                context: this,
                state: 'projetos',
                asArray: false
            })
        })
    }

    handleRemove(key) {
        base.remove(uid + '/' + key)
            .then(() => {
                console.log('sucesso')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    listItem(key, projeto) {
        console.log(key, projeto)
        return (
            <div key={key} className="card" style={{ width: "18rem" }}>
                {/* <img className="card-img-top" src=".../100px180/" alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">{projeto.nome}</h5>
                    <p className="card-text">{projeto.descricao}</p>
                    {/* <button type="button" className="btn btn-primary" oncClick={() => this.openProject()}>Ver</button> */}
                    <button type="button" className="btn btn-primary" onClick={() => this.handleRemove(key)}>Excluir</button>
                    <button type="button" className="btn btn-primary" data-toggle="modal" onClick={() => this.getThisItem(key)} data-target="#exampleModal">Editar</button>
                    <Link to='/projetos/galeria' onClick={() => this.openProject(key)}>Visualizar</Link>
                </div>
            </div>
        )
    }

    getThisItem(key) {

        this.nome.value = this.state.projetos[key].nome
        this.descricao.value = this.state.projetos[key].descricao
        this.setState({
            key
        })
        console.log(key)
    }

    handleSave(event, key) {
        event.preventDefault()

        const nome = this.nome.value
        const descricao = this.descricao.value

        this.state.key ?
            base.update(uid + '/' + this.state.key, {
                data: {
                    nome,
                    descricao
                }
            }).then(() => {
                this.setState({
                    key: null
                })
            }).catch(error => {
                console.log(error)
            })
            :
            base.push(uid, {
                data: {
                    nome,
                    descricao
                }
            }).then(() => {
                console.log(key, this.state.key)
            }).catch(error => {
                console.log(error)
            })
        this.nome.value = ''
        this.descricao.value = ''
    }

    openProject(key) {
        idProjeto = key
    }

    render() {

        return (
            <div>
                <div>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Criar Projeto</button>
                    {Object
                        .keys(this.state.projetos)
                        .map(key => this.listItem(key, this.state.projetos[key]))}
                </div>


                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Criar Projeto</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="nome" className="col-form-label">Nome:</label>
                                        <input ref={ref => this.nome = ref} type="text" className="form-control" id="nome" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="descricao" className="col-form-label">Descrição:</label>
                                        <textarea ref={ref => this.descricao = ref} className="form-control" id="descricao"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                {}
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSave}>Criar</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export { idProjeto }