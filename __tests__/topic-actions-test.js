jest.unmock('../src/actions/topicActions');
import * as TopicActions from '../src/actions/topicActions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as TestTopics from './assets/testTopics';
import expect2 from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

    /**
     * Produce a harness to test whether we make the right sort of request for new topics and handle the
     * response appropriately.
     */
    it('can create an action for getting new topics', (done) => {
        const date = Date.now();
        nock('http://localhost:8000/')
            .get('/topics.json')
            .reply(200, { topics: [TestTopics.berlinTopic] });

        const expectedActions = [
            { type:  TopicActions.REQUEST_TOPICS, date},
            { type: TopicActions.RECEIVE_TOPICS, topics: [TestTopics.berlinTopic]}
        ];
        const store = mockStore({ topics: [] });

        return store.dispatch(TopicActions.getTopics(date))
            .then(() => {
                // Test that we got all of the actions we expected.
                expect(store.getActions()).toEqual(expectedActions);
                done();
            }).catch((error) => console.log(error));
    });
});