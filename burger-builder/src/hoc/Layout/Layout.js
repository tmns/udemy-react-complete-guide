import React, { useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    } 

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <React.Fragment>
            <Toolbar 
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={props.isAuthenticated} 
            />
            <SideDrawer 
                open={sideDrawerIsVisible} 
                closed={sideDrawerClosedHandler} 
                isAuth={props.isAuthenticated}
            />
            <main className={styles.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);