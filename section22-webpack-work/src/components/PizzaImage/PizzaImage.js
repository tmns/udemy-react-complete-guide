import React from 'react';

import styles from './PizzaImage.module.css';
import PizzaImage from '../../assets/pizza.jpg';

const pizzaImage = (props) => {
    <div className={styles.PizzaImage}>
        <img src={PizzaImage} className={styles.PizzaImg} />
    </div>
}

export default pizzaImage;