import React from 'react';
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const modal = props => {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    // componentWillUpdate() {
    //     //console.log('[Modal] componentWillUpdate')
    // }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div 
                className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' :'0'
                }}
            >
                {props.children}
            </div>
        </React.Fragment>
    );
}



export default React.memo(modal, 
    (prevProps, nextProps) => 
        nextProps.show !== prevProps.show ||
        nextProps.children !== prevProps.children
    );