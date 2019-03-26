import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './Modal.css';

const animationTiming = {
    enter: 400,
    exit: 1000
}

const modal = (props) => {
    return (
        <CSSTransition 
            mountOnEnter
            unmountOnExit
            in={props.show} 
            timeout={animationTiming}
            classNames="fade-slide" // can also be an object with the various class names you want to use
        >
                <div className="Modal">
                    <h1>A Modal</h1>
                    <button 
                        className="Button" 
                        onClick={props.closed}
                    >Dismiss</button>
                </div> 
        </CSSTransition>
    )
};

export default modal;