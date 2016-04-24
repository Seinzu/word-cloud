jest.unmock('../src/reducers/topicReducer');
import TopicReducer from '../src/reducers/topicReducer';

const error = false;

describe('TopicReducer', () => {
   it('Can handle receiving the topic chosen action', () => {
       const id  = 1;

       const action = {
           type: 'TOPIC_CHOSEN',
           id,
           date: Date.now()
       };

       const chosenTopic = {id, label: 'test'};
       const topics = [
           chosenTopic, {id: 2, label: "test 2"}
       ];

       const initialState = {
           topics,
           selectedTopic: false,
           error
       };

       const expectedState = {
           topics,
           selectedTopic: chosenTopic,
           error
       };
       const newState = TopicReducer(initialState, action);

       expect(newState).toEqual(expectedState);
   });

   it('Returns provided state if unknown action provided', () => {
       const expectedState = {
           topics: [],
           selectedTopic: false,
           error
       };
       const badAction = {
           type: 'BAD_ACTION'
       };
       const newState = TopicReducer(expectedState, badAction);
       expect(newState).toEqual(expectedState);

   });

    it('can receive topics and add them to the state', () => {
        const topics = [
            {
                id: 1, label: "test"
            },
            {
                id: 2, label: "test2"
            }];
        const selectedTopic = false;
        const expectedState = {
           topics,
            selectedTopic,
            isFetching: false,
            error
       };
        const action = {
            type: 'RECEIVE_TOPICS',
            topics
        };
        const newState = TopicReducer({topics: [], selectedTopic: false, isFetching: true}, action);
        expect(newState).toEqual(expectedState);
    });
});