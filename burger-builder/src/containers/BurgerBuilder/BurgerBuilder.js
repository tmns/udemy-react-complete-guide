import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

// export used here in order for testing (to remove it from the redux context)
const burgerBuilder = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    // state = {
    //     purchasing: false,
    // }

    const [purchasing, setPurchasing] = useState(false);

    // componentDidMount () {
    //     this.props.onInitIngredients();
    // }

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount === 2) {
    //         return;
    //     }
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // updatePurchaseState(ingredients) {
    //     const sum = Object.keys(ingredients)
    //         .map(igKey => {
    //             return ingredients[igKey];
    //         })
    //         .reduce((sum, el) => {
    //             return sum + el;
    //         }, 0);
    //     this.setState({ purchasable: sum > 0 })

    // }

    // could also be moved to Redux but not necessary
    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            // setState({ purchasing: true });
            setPurchasing(true);
            purchaseContinueHandler();
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
        // this.setState({ purchasing: false });
    }

    // purchaseContinueHandler = () => {
    //     const queryParams = [];
    //     for (let i in this.props.ings) {
    //         queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i]));
    //     }
    //     queryParams.push('price=' + this.state.totalPrice);
    //     const queryString = queryParams.join('&');
    //     this.props.history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     });

    // }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout')
        // this.props.onInitPurchase();
    }

    const disabledInfo = {
        ...props.ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = { less: disabledInfo[key] <= 0, more: disabledInfo[key] === 2 };
    }
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded :(</p> : <Spinner />;
    if (props.ings) {
        orderSummary =
        <OrderSummary
            ingredients={props.ings}
            price={props.price}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />;
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                />
            </React.Fragment>
        );
    }
    // if (this.state.loading) {
    //     orderSummary = <Spinner />;
    // }

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));