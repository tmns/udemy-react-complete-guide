import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium'; 
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'asfa1', name: 'Jeremiah', age: 22 },
      { id: 'vasdf1', name: 'Steven', age: 28 },
      { id: 'asdf1', name: 'Sarah', age: 23 }
    ]
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // const person = Object.assign({}, this.state.persons[peresonIndex]) // for immutable editing

    const person = {
      ...this.state.persons[personIndex] // same as above line but using spread in an object (ES6)
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); //slice here simply returns a new copy of the same array, so we update state in immutable fashion
    const persons = [...this.state.persons]; //same as line above but using spread operator (ES6)
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    // example of inline style, scoped to specific element
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}  // for react to compare elements of future with past to only update DOM where is needed
              changed={(event) => this.nameChangeHandler(event, person.id)} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      // Must be wrapped in StyleRoot for Radium media query styling
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {/* non-optimal way of conditional stmt (using ternirary)
          { 
            this.state.showPersons ? 
              <div>
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
              </div> : null 
          }
          */}
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
