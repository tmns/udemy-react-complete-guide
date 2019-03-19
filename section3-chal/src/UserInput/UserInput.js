import React from 'react';

const userInput = (props) => {
    const style= {
        border: '2px solid blue'
    };

    return (
        <div className="UserInput">
            <input 
                type="text"
                placeholder="Άλλαξε Όνομα"
                style={style}
                onChange={props.changed} 
                value={props.username}/>
        </div>
    );
};

export default userInput;