import TopicReducer from "reducers/topicReducer";
import thunkMiddleware from "redux-thunk";
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

/**
 * Creates the topic store.
 *
 * This is designed to be used isomorphically.
 * @returns {*}
 */
export default function topicStore() {
    const reducer = combineReducers({TopicReducer});
    const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
    return store;
};
