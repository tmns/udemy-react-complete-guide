import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css'

const logo = () => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="My Burger" />
    </div>
);

export default logo;

