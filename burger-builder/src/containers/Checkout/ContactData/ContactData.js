import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault(); // prevents the default action of sending a req & reloading the page
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, // price should actually be calculated on the server, this is just an (insecure) example
            customer: {
                name: 'Sairim N',
                zipCode: '19282',
                country: 'Denmark'
            },
            email: 'test@test.com',
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then((response) => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false });
            });
    }
    
    render() {
        let form = (
            <form>
                <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
                <input className={styles.Input} type="text" name="email" placeholder="Your Email" />
                <input className={styles.Input} type="text" name="street" placeholder="Street" />
                <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                    {form}
            </div>
        )
    }
}

export default ContactData;