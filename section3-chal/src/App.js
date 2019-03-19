import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    users: [
      { username: 'Γιάννη', job: 'ντελιβερέας' },
      { username: 'Νικόλα', job: 'άνεργος' }
    ]
  }

  switchJobHandler = () => {
    this.setState({
      users: [
        { username: 'Γιάννη', job: 'ταξιτζής' },
        { username: 'Νικόλα', job: 'προγραμματιστής' }
      ]
    });
  }

  changeUsernameHandler = (event) => {
    this.setState({
      users: [
        { username: 'Γιάννη', job: 'ταξιτζής' },
        { username: event.target.value, job: 'άνεργος' }
      ]
    })
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Section 3 Challenge</h1>
        <button
          style={style}
          onClick={this.switchJobHandler}>Άλλαξε Δουλειά</button>
        <UserOutput 
          username={this.state.users[0].username} 
          job={this.state.users[0].job} />
        <UserOutput 
          username={this.state.users[1].username} 
          job={this.state.users[1].job}/>
        <UserInput 
          changed={this.changeUsernameHandler}
          value={this.state.users[1].username} />
      </div>
    );
  }
}

export default App;
