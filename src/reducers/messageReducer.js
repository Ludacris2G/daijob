import { GET_MESSAGES } from "../actions/actionType"

export const initialState = {
    messages: [],
    loading: false,
}

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            }
        default:
            return state;
    }
};

export default messageReducer;