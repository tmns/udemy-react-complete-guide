import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

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
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
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

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
        this.props.onInitPurchase();
    }

    render() { 
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = { less: disabledInfo[key] <= 0, more: disabledInfo[key] === 2 };
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded :(</p> : <Spinner />;
        if (this.props.ings) {
            orderSummary =
            <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </React.Fragment>
            );
        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));