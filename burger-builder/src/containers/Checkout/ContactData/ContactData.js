import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const contactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            valueType: 'name',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            valueType: 'street',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            valueType: 'zip code',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        Country: {
            valueType: 'country',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            valueType: 'email',
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            valueType: 'delivery method',
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    })

    const [formIsValid, setFormIsValid] = useState(false);
    // formIsValid: false

    const orderHandler = (event) => {
        event.preventDefault(); // prevents the default action of sending a req & reloading the page
        // this.setState({ loading: true })
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price, // price should actually be calculated on the server, this is just an (insecure) example
            orderData: formData,
            userId: props.userId
        }

        props.onOrderBurger(order, props.token);
    }

    // checkValidity(value, rules) {
    //     let isValid = true;

    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid;
    //     }

    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid;
    //     }

    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid;
    //     }

    //     return isValid;
    // }

    const inputChangeHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            value: event.target.value,
            touched: true,
        }) 
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;
        for (let inputIdentifer in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifer].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
        // this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    valueType={formElement.config.valueType}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => inputChangeHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                />
            ))}
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />;
    }
    return (
        <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));