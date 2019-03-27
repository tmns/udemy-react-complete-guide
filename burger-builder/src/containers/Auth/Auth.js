import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/auth';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            valueType: 'email',
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            valueType: 'password',
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })
    const [isSignup, setIsSignup] = useState(false);
    const [error] = useState(null);

    // componentDidMount() {
    //     if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
    //         this.props.onSetAuthRedirectPath();
    //     }
    // }

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, [])

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        })
        //this.setState({controls: updatedControls})
        setAuthForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        // this.setState(prevState => {
        //     return {isSignup: !prevState.isSignup}
        // })
        setIsSignup(!isSignup);
    }

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key],
        });
    }

    let form = formElementsArray.map(formElement => (
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
    ))
    
    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if (error) {
        errorMessage = (
            <p className={styles.Error}>{error.message.replace(/[_-]/g, " ")}</p>
        )
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={styles.Auth}>
            {authRedirect}
            <h3>{isSignup ? 'Sign Up' : 'Sign In'} Below</h3>
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button 
                clicked={switchAuthModeHandler}
                btnType="Danger"
            >SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);