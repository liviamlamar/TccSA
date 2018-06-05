import React from 'react'

const Card = (props) => {

    return (
        <div className="col-mb-3" style={{ marginRight: '10px' }}>
            <div key={this.props.key} className="card" style={{ maxWidth: "18rem", marginBottom: "10px" }}>
                <div className="card-body">
                    <img src={this.props.url} alt='imagem' style={{ width: "16rem" }} />
                </div>
            </div>
        </div>
    )

}

export default Card