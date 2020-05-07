import React, { Component } from 'react'
import './App.css';
import Tetris from './components/Tetris';




export default class App extends Component {

  state = {
    scores: []
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/scores")
    .then(response => response.json())
    .then(scores => this.setState({scores}))
  }

  render() {
    let scores = this.state.scores
    return (
      <div className="App">
        <Tetris scores={scores} />
      </div>
    )
  }
}
