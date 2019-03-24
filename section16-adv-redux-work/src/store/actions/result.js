import * as actionTypes from './actionTypes';

export const saveResult = (result) => {
    return {
        type: actionTypes.STORE_RESULT,
        res: result
    }
}

export const storeResult = (result) => {
    const updatedResult = result * 2;
    return function (dispatch, getState) { // from thunk middleware | getState can be used to reach out to the state during async call
        setTimeout(() => {
            const oldCounter = getState().ctr.counter;
            console.log(oldCounter);
            dispatch(saveResult(updatedResult))
        }, 2000);
    }
}

export const deleteResult = (resultElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        res: resultElId
    }
}