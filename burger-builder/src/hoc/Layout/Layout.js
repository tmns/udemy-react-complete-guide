import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    } 

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated} 
                />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} 
                    isAuth={this.props.isAuthenticated}
                />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);