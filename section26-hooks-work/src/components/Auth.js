import React, { useContext } from 'react';

import AuthContext from '../auth-context';

const auth = props => {
    const auth = useContext(AuthContext);
    
    return (
        <React.Fragment>
            <h1>Auth Component</h1>
            <button onClick={auth.login}>Log in!</button>
        </React.Fragment>
    )
}

export default auth;