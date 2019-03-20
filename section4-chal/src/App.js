import React, { Component } from 'react';
import './App.css';
import Validation from './Validation/Validation'
import Char from './Char/Char'

class App extends Component {
  state = { text: '' };

  fieldChangedHandler = (event) => {
    this.setState({ text: event.target.value });
  }

  deleteCharHandler = (charIndex) => {
    const chars = [...this.state.text];
    chars.splice(charIndex, 1);
    const text = chars.join('');
    this.setState({text: text})
  }
  
  render() {
    const chars = this.state.text.split('').map((letter, index) => {
      return letter !== ' ' ?
        <Char
          key={index}
          value={letter}
          click={() => this.deleteCharHandler(index)} 
        /> 
      : null
    });

    return (
      <div className="App">
        <h1>Section 4 Challenge</h1>
        <input 
          type="text" 
          placeholder="type something" 
          onChange={(event) => this.fieldChangedHandler(event)} 
          value={this.state.text} 
        />
        
        <p>Length of text: {this.state.text.length}</p>
        
        <Validation length={this.state.text.length} />

        <h4>Feel free to remove letters by clicking their containing boxes below!</h4>

        {chars}
      </div>
    );
  }
}

export default App;
