import { GET_MESSAGES, SEND_MESSAGE } from "../actions/actionType"

export const initialState = {
    messages: [],
}

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        // this has to be more efficient so I don't fetch the entire array every time a new message is sent
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