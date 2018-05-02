import React, { Component } from 'react'

export default class Test extends Component{
    
    render(props){
        const style = {
            position:{
                x: (this.props.x),
                y: (this.props.y)
            }
        }
        return(
            <p style={style.position}>{this.props.letra}</p>
        )
    }
}