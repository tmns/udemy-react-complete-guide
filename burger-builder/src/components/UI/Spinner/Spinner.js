import React from 'react';
import styles from './Spinner.module.css';

const spinner = () => (
    <div className={styles.SkFoldingCube}>
        <div className={styles.SkCube1 + ' ' + styles.SkCube}></div>
        <div className={styles.SkCube2 + ' ' + styles.SkCube}></div>
        <div className={styles.SkCube4 + ' ' + styles.SkCube}></div>
        <div className={styles.SkCube3 + ' ' + styles.SkCube}></div>
    </div>
);

export default spinner;