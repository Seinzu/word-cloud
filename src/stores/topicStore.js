import TopicReducer from "reducers/topicReducer";
import thunkMiddleware from "redux-thunk";
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

const createTopicStore = function createTopicStore(middlewares, reducers) {
    const reducer = combineReducers(reducers);
    const store = createStore(reducer, applyMiddleware(...middlewares));
    return store;
};

/**
 * Creates the topic store.
 *
 * This is designed to be used isomorphically.
 * @returns {*}
 */
export default function topicStore() {
    return createTopicStore([thunkMiddleware, loggerMiddleware], {TopicReducer});
};
