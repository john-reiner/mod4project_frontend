import React, { Component } from 'react'

export default class LogIn extends Component {

    state = {
        firstName: '',
        lastName: '',
        userName: '',
        passWord: '',
        confirmedPassword: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        console.log(this.state)
    }
    render() {
        
        return (
            <div>
                <form>
                    <input name="firstName" placeholder='First Name' value={this.state.firstName} onChange={this.handleChange}/>
                    <br />
                    <input name="lastName" placeholder='Last Name' value={this.state.lastName} onChange={this.handleChange}/>
                    <br />
                    <input name="userName"placeholder='User Name' value={this.state.userName} onChange={this.handleChange}/>
                    <br />
                    <input name="password" type="password" placeholder='Password' value={this.state.password} onChange={this.handleChange}/>
                    <br />
                    <input name="confirmedPassword" type="password" placeholder='Confirm Password' value={this.state.confirmedPassword} onChange={this.handleChange}/>
                    <br />
                    <button onClick={this.onSubmit}>Submit</button>
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}
