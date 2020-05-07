import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <Link to="/leaderBoard"><li>Leader Board</li></Link>
                    <Link to='/login'><li>Login</li></Link>
                    <Link to='/'><li>Tetris</li></Link>
                    <li id='user'>Current User</li>
                </ul>
            </div>
        )
    }
}
