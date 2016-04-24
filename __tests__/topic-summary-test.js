jest.unmock('../src/components/topicSummary');

import TopicSummary from '../src/components/topicSummary';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import using from 'jasmine-data-provider';
// Test topics taken from the topics.json file.
import * as TestTopics from './assets/testTopics';

// Describe the TopicSummary view component.
describe('TopicSummary', () => {

    const injectTopicSummaryForTopic = (topic) => {
        const topicSummaryElement = TestUtils.renderIntoDocument(<TopicSummary topic={topic}/>);
        const topicSummaryDOMNode = ReactDOM.findDOMNode(topicSummaryElement);
        return topicSummaryDOMNode;
    };

    const testData = [
        {
            topic: TestTopics.berlinTopic,
            title: "Berlin",
            totalMentions: 165,
            positiveMentions: 29,
            neutralMentions: 133,
            negativeMentions: 3
        },
        {
            topic: TestTopics.djTopic,
            title: "DJ",
            totalMentions: 48,
            positiveMentions: 2,
            neutralMentions: 46,
            negativeMentions: 0
        },
        {
            topic: TestTopics.hammeredTopic,
            title: "Hammered",
            totalMentions: 48,
            positiveMentions: 0,
            neutralMentions: 18,
            negativeMentions: 30
        },
        {
            topic: TestTopics.legendaryTopic,
            title: 'legendary nightclub',
            totalMentions: 6,
            positiveMentions: 6,
            neutralMentions: 0,
            negativeMentions: 0
        }
    ];

    using(testData, ({topic, totalMentions}) => {
        it('displays the total mentions', () => {
            const topicSummaryDOMNode = injectTopicSummaryForTopic(topic);
            expect(topicSummaryDOMNode.textContent).toContain("Total mentions:" + totalMentions);
        });
    });

    using(testData, ({topic, positiveMentions}) => {

        it('displays a count of positive mentions', () => {
            const topicSummaryDOMNode = injectTopicSummaryForTopic(topic);
            expect(topicSummaryDOMNode.textContent).toContain("Positive mentions:" + positiveMentions);
        });
    });

    using(testData, ({topic, neutralMentions}) => {

        it('displays a count of neutral mentions', () => {
            const topicSummaryDOMNode = injectTopicSummaryForTopic(topic);
            expect(topicSummaryDOMNode.textContent).toContain('Neutral mentions:' + neutralMentions);
        });
    });

    using(testData, ({topic, negativeMentions}) => {

        it('displays a count of negative mentions', () => {
            const topicSummaryDOMNode = injectTopicSummaryForTopic(topic);
            expect(topicSummaryDOMNode.textContent).toContain('Negative mentions:' + negativeMentions);
        });
    });

    using(testData, ({topic, title}) => {
        it ("displays a title including the topic name", () => {
            const topicSummaryDOMNode = injectTopicSummaryForTopic(topic);
            expect(topicSummaryDOMNode.textContent).toContain(title);
        });
    });

});