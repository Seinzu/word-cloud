import * as ActionTypes from '../constants/actionTypes';
import {calculateSentiment, calculateProminence} from '../helpers/topicHelpers';

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
            const topics = action.topics.map((topic, index, context) => {
                topic.sentimentTenor = calculateSentiment(topic);
                topic.size = calculateProminence(topic, context);
                return topic;
            });
            return Object.assign({}, state, {isFetching: false, topics});
        case ActionTypes.ERROR_RECEIVING_TOPICS:
            return Object.assign({}, state, {isFetching: false, error: action.error});
        default:
            return state;
    }
};