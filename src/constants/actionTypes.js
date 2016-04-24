/**
 * Actions of this type are used to indicate that a topic has been selected for detailed display.
 * @type {string}
 */
export const TOPIC_CHOSEN = 'TOPIC_CHOSEN';

/**
 * Actions of this type indicate that a topic list is being passed into the store.
 * @type {string}
 */
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';

/**
 * Actions of this type are used to indicate that the topic list has been requested.
 * @type {string}
 */
export const REQUEST_TOPICS = 'REQUEST_TOPICS';

/**
 * Actions of this type indicate that there was a problem retrieving topics from the remote source.
 * @type {string}
 */
export const ERROR_RECEIVING_TOPICS = 'ERROR_RECEIVING_TOPICS';