import { GET_EVENTS } from "../actions/actionType";

export const initialState = {
    events: [],
};

const eventReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        default:
            return state;
    }
};

export default eventReducer;