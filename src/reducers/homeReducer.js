import * as appTypes from '../types/homeTypes';

const initionalState = {
    buttonIsPressed: false,
}

export const homeReducer = ( state = initionalState, action ) => {
    switch (action.type) {
        case appTypes.TOGGLE_BUTTON: 
            return {
                ...state,
                buttonIsPressed: !state.buttonIsPressed,
            }
        default: return state;
    }
}