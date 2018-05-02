import React, { Component } from 'react'

import './Estomatos.css'

import Estomatosimg from '../imgs/figura1-estomatos.jpg'

export default class Estomatos extends Component{
    render(){
        return(
                <div className="container">
                    <h1 id="title">Estômatos</h1>
                    <div id="texto">
                        <p>Entre as estruturas que formam o tecido epidérmico, estão os estômatos, formados por um ostíolo rodeado por células oclusivas de forma arredondada, denominadas células-guardas, as quais podem ou não estar acompanhadas por outras células epidérmicas estrutural e fisiologicamente associadas aos estômatos, que recebem o nome de subsidiárias (RUIZ ET AL., 1962; LINDORFF ET AL., 1991, FLORES-VINDAS, 1999).</p>
                        <p>Com base na disposição das células subsidiárias, este complexo estomático pode ser classificado em: anomocítico (a célula subsidiária ocorre, mas não é identificada), anisocítico (ocorrem três células subsidiárias ao redor do estômato com tamanho e formato diferentes), paracítico (com uma ou duas células subsidiárias paralelas ao maior eixo do estômato), diacítico (a parede comum às células subsidiárias dispõem-se perpendicularmente ao maior eixo do estômato), ciclocítico (as células subsidiárias envolvem o estômato, descrevendo um círculo ou semicírculo) e tetracítico (ocorre em quatro células subsidiárias, duas paralelas ao estômato e uma em cada um de seus polos) (SOUZA, 2016).</p>
                        <p>Quanto à presença de estômato, as folhas, por sua vez, também podem ser classificadas, sendo denominadas de folhas anfiestomáticas aquelas que possuem complexos estomáticos na epiderme de ambas as faces; folhas epiestomáticas as que os possuem somente na epiderme adaxial ou superior; e folhas hipoestomática, as folhas que possuem estômatos apenas na face abaxial ou inferior (SOUZA, 2016), como ocorre com Ormosia arborea, uma espécie arbórea nativa (Figura 1).</p>
                        <div id="div-imagem">
                            <img id="imagem" src={Estomatosimg} alt="figura1"></img>
                        </div>
                        <p>Nas plantas, os estômatos desempenham um papel importante na troca de gases (respiração e fotossíntese) e na transpiração (perda de água na forma de vapor), influenciando todo o funcionamento da planta. As células-guarda, que apresentam um formato diferenciado, disposição radial das microfibrilas de celulose na parede e espessamento maior nas porções voltadas para o ostíolo, têm a função de controlar a abertura e o fechamento dos estômatos por meio da variação da turgescência. Na maioria das plantas, os estômatos se abrem pela manhã quando há presença de luz e os solutos são acumulados ativamente nas células-guarda, causando um movimento osmótico de água para dentro delas. Por outro lado, os estômatos se fecham com a diminuição da luminosidade ao final do dia por um processo inverso: redução da concentração de solutos nas células-guarda e consequente saída da água, reduzindo a pressão de turgor (RAVEN et al., 2014).</p>
                    </div>
                </div>
        )
    }
}