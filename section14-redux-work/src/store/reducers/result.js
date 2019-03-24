import * as actionTypes from '../actions';

const initialState = {
    results: []
}

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                //concat same as push, but IMMUTABLY alters the array, ie creates a new array w passed value added
                results: state.results.concat({id: new Date(), value: action.result}) 
            }
        case actionTypes.DELETE_RESULT:
            const updatedArray = state.results.filter(result => result.id !==  action.resultElId); //remove element immutably
            return {
                ...state,
                results: updatedArray
            }

        default:
            return state;
    }
};

export default resultReducer;