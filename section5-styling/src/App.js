import React, { Component } from 'react';
import styles from './App.module.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            // "key" for react to compare elements of future with past to only update DOM where is needed
            // must always be on the outer element, which is why its attached to ErrorBoundary instead of Person
            return <ErrorBoundary key={person.id}> 
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.nameChangeHandler(event, person.id)} 
              />
            </ErrorBoundary>
          })}
        </div>
      );
      btnClass = styles.Red;
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(styles.red);
    }
    if (this.state.persons.length <= 1) {
      classes.push(styles.bold);
    }

    return (
      // Must be wrapped in StyleRoot for Radium media query styling
        <div className={styles.App}>
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button
            className={btnClass}
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
    );
  }
}

export default App;
