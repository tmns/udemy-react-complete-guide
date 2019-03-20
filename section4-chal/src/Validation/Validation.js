import React from 'react';

const validation = (props) => {
    
    let msg = 'great, text long enough';
    
    if (props.length < 5) {
        msg = 'sorry, text too short';
    }

    return (
        <div>
            <p>{msg}</p>
        </div>
        
    );
};

export default validation;