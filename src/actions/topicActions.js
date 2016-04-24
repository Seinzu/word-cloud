import * as ActionTypes from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';

// Pass through the TOPIC_CHOSEN action type constant for ease of use.
export const TOPIC_CHOSEN = ActionTypes.TOPIC_CHOSEN;
/**
 * Handle a user clicking on (and selecting) a topic from the word cloud.
 * @param id
 * @param date
 * @returns {{type, id: *, date: *}}
 */
export function clickTopic(id, date) {
    const type = ActionTypes.TOPIC_CHOSEN;
    return {
        type,
        id,
        date
    };
};

// Pass through the REQUEST_TOPICS action type constant for ease of use.
export const REQUEST_TOPICS = ActionTypes.REQUEST_TOPICS;
/**
 * Indicates that we would like to fetch topics from the remote source.
 * @returns {{type}}
 */
export function requestTopics(date) {
    return {
        type: ActionTypes.REQUEST_TOPICS,
        date
    };
};

/**
 * Perform an async request to get the topics (uses thunk).
 * @returns {Function}
 */
export function getTopics(date) {
    const hostname = process.env.HOSTNAME || "localhost";
    const port     = process.env.PORT || 8000;
    return dispatch => {
        dispatch(requestTopics(date));
        return fetch('http://' + hostname + ':' + port +'/topics.json')
            .then((response) => response.json())
            .then((json) => {
                    const topics = json.topics;
                    dispatch(receiveTopics(topics));
            })
            .catch((error) => {
                dispatch(reportTopicsError(error))
            });
    }
};

// Pass through the RECEIVE_TOPICS action type constant for ease of use.
export const RECEIVE_TOPICS = ActionTypes.RECEIVE_TOPICS;

/**
 * Once topics have been gathered this action will load the retrieved topics into the store.
 * @param topics
 * @returns {{type}}
 */
export function receiveTopics(topics) {
    const type = ActionTypes.RECEIVE_TOPICS;
    return {
        type,
        topics
    }
};

// Pass through the ERROR_RECEIVING_TOPICS action type constant for ease of use.
export const ERROR_RECEIVING_TOPICS = ActionTypes.ERROR_RECEIVING_TOPICS;

export function reportTopicsError(error, date) {
    const type = ERROR_RECEIVING_TOPICS;
    return {
        type,
        error,
        date
    }
}