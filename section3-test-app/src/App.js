import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Jeremiah', age: 22 },
      { name: 'Steven', age: 28 },
      { name: 'Sarah', age: 23 }
    ]
  }

  switchNameHandler = (newName) => {
    this.setState({ 
      persons: [
        { name: newName, age: 22 },
        { name: 'Helen', age: 28 },
        { name: 'Sarah', age: 26 }
      ]  
    })
  }

  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Jeremiah', age: 22 },
        { name: event.target.value, age: 28 },
        { name: 'Sarah', age: 26 }
      ]
    })
  }

  render() {
    // example of inline style, scoped to specific element
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={() => this.switchNameHandler('Alison')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Berry')}
          changed={this.nameChangeHandler}>My Hobbies: Reading, Coding, Guitar</Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    );
  }
}

export default App;
