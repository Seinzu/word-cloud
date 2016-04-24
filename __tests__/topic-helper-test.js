jest.unmock('../src/helpers/topicHelpers');

import using from 'jasmine-data-provider';

import * as TopicHelpers from '../src/helpers/topicHelpers';

import * as TestTopics from './assets/testTopics';

describe('calculateSentiment', () => {

    const positiveData = [
        61, 70, 99, 62, 85
    ];
    using(positiveData, (sentimentScore) => {
        it('will describe any sentiment score over 60 as positive', () => {
            const topic = {
                sentimentScore
            };

            const sentiment = TopicHelpers.calculateSentiment(topic);

            expect(sentiment).toEqual('positive');
        })
    });

    const negativeData = [
        39, 38, 1, 2, 20
    ];
    using(negativeData, (sentimentScore) => {
        it('will describe any sentiment score under 40 as negative', () => {
            const topic = {
                sentimentScore
            };
            const sentiment = TopicHelpers.calculateSentiment(topic);

            expect(sentiment).toEqual('negative');
        });
    });

    const neutralData = [
        {sentimentScore: 40},
        {sentimentScore: 41},
        {sentimentScore: 59},
        {sentimentScore: 60},
        {sentimentScore: 50},
        {sentimentScore: 45},
        {sentimentScore: 55},
        TestTopics.clubCultureTopic,
        TestTopics.djTopic
    ];

    using(neutralData, (topic) => {
        it('will describe any sentiment score between 40 and 60 (inclusive) as neutral', () => {

            const sentiment = TopicHelpers.calculateSentiment(topic);

            expect(sentiment).toEqual('neutral');
        });
    });

});

const prominenceData = [
    {topic: {id: 1, volume: 3}, expectation: 3},
    {topic: {id: 1, volume: 15}, expectation: 6},
    {topic: TestTopics.clubCultureTopic, expectation: 3},
    {topic: TestTopics.berlinTopic, expectation: 6}
];

describe('calculateProminence', () => {
    using(prominenceData, ({topic, expectation}) => {
        it('determines the prominence of a topic in light of the other topics', () => {
            const topics = [
                topic,
                {
                    id: 2,
                    volume: 11
                },
                {
                    id: 3,
                    volume: 5
                },
                {
                    id: 4,
                    volume: 1
                },
                {
                    id: 5,
                    volume: 2
                },
                {
                    id: 6,
                    volume: 12
                }
            ];

            const originalTopics = topics.slice(0);

            const importance = TopicHelpers.calculateProminence(topic, topics);

            expect(importance).toEqual(expectation);
            expect(topics).toEqual(originalTopics);
        })
    });

});