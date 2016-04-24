import * as ActionTypes from '../constants/actionTypes';

const initialState = {
        topics: [],
        selectedTopic: false,
        isFetching: false,
        error: false
    };

export default function TopicReducer(state = initialState, action) {
    // Clear any pre-existing errors when we get a new action.
    state = Object.assign({}, state, {error: false});
    switch (action.type) {
        case ActionTypes.TOPIC_CHOSEN:
            const selectedTopic = state.topics.reduce((left, item, idx) => {
                if (action.id === item.id) {
                    return item;
                }
                return left;
            }, false);
            return Object.assign({}, state, {selectedTopic});
        case ActionTypes.FETCH_TOPICS:
            return Object.assign({}, state, {isFetching: true});
        case ActionTypes.RECEIVE_TOPICS:
            return Object.assign({}, state, {isFetching: false, topics: action.topics});
        case ActionTypes.ERROR_RECEIVING_TOPICS:
            return Object.assign({}, state, {isFetching: false, error: action.error});
        default:
            return state;
    }
};