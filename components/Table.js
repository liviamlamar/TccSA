import React from 'react'

const Table = (props) => {

    return (
        <div>
            <table id="tabela">
          <thead>
            <tr id="cabeca-tabela">
              <th colspan="5">Dados Contagem</th>
            </tr>
          </thead>

          <thead>
            <tr>
              <th>NE</th>
              <th>CE</th>
              <th>Índice Estomático</th>
              <th>Área</th>
              <th>Densidade Estomática</th>
            </tr>
          </thead>

          <tfoot>
            <tr>
              <td id="ne">{props.ne}</td>
              <td id="ce">{props.ce}</td>
              <td id="indice">{props.indice}</td>
              <td id="area">{props.area}</td>
              <td id="densidade">{props.densidade}</td>
            </tr>
          </tfoot>	

          <tbody>

          </tbody>
        </table>
        </div>
    )

}

export default Table