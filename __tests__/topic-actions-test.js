jest.unmock('../src/actions/topicActions');
import * as TopicActions from '../src/actions/topicActions';

/**
 * The TopicActions package contains the functions for creating the actions that are dispatched through the redux
 * store. The test here ensure that the actions produced are valid.
 */
describe('TopicActions', () => {

    it('can produce an appropriate action for selecting a topic', () => {
        const id = 2;
        const date = Date.now();
        const expectedAction = {
            type: "TOPIC_CHOSEN",
            id: id,
            date
        };

        const actualAction = TopicActions.clickTopic(id, date);
        expect(actualAction).toEqual(expectedAction);
    });

    it('can produce an appropriate action when we are retrieving topics', () => {
        const date = Date.now();
        const expectedAction = {
            type: "REQUEST_TOPICS",
            date
        };

        const actualAction = TopicActions.requestTopics(date);
        expect(actualAction).toEqual(expectedAction);
    });

    it('can produce an appropriate action for reporting an error', () => {
        const date = Date.now();
        const error = 'This was an error';
        const expectedAction = {
            type: "ERROR_RECEIVING_TOPICS",
            date,
            error
        };

        const actualAction = TopicActions.reportTopicsError(error, date);
        expect(actualAction).toEqual(expectedAction);
    });
});