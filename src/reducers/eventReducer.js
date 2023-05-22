import { DELETE_EVENT, GET_EVENTS } from "../actions/actionType";

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
        case DELETE_EVENT:
            const deletionId = action.payload;
            const postDeletionEvents = state.events.filter((event) => {
                return event.id !== deletionId;
            })
            return {
                ...state,
                events: postDeletionEvents,
            }
        default:
            return state;
    }
};

export default eventReducer;