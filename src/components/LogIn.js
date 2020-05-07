import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class LogIn extends Component {

    state = {
        userName: '',
        passWord: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
    }
    render() {
        return (
            <div>
                <form>
                    <input name="userName" placeholder='User Name' value={this.state.userName} onChange={this.handleChange}/>
                    <br />
                    <input name="passWord" type="password" placeholder='Password' value={this.state.passWord} onChange={this.handleChange}/>
                    <br />
                    <button onClick={this.onSubmit}>Submit</button>
                    <Link to='/sign-up'><button>Sign Up</button></Link>
                </form>
            </div>
        )
    }
}
