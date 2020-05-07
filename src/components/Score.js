import React, { Component } from 'react'

export default class Score extends Component {
    render() {

        return (
            <div>
                <tr>
                    <td>{this.props.userName}</td>
                    <td>{this.props.points}</td>
                    <td>{this.props.level}</td>
                    <td>{this.props.rows}</td>
                </tr>
            </div>
        )
    }
}
