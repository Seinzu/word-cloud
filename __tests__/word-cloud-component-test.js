jest.unmock('../src/components/wordCloud');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import WordCloud from '../src/components/wordCloud';
import Word from '../src/components/word';

describe('WordCloud', () => {
    /**
     * We will create a single word for each topic we receive as a property.
     */
    it("creates one word per provided topic", () => {
        const topics = [
            {
                id: 1,
                label: 'Topic'
            }
        ];
        const error = false;
        const wordCloudElement = TestUtils.renderIntoDocument(
            <WordCloud topics={topics} error={error} />
        );

        expect(TestUtils.scryRenderedComponentsWithType(wordCloudElement, Word).length).toEqual(1);
    });

    it("can display an empty message when topic property undefined", () => {
        const topics = undefined;
        const wordCloudElement = TestUtils.renderIntoDocument(
            <WordCloud topics={topics} />
        );
        const wordCloudDOMNode = ReactDOM.findDOMNode(wordCloudElement);

        expect(wordCloudDOMNode.textContent).toEqual('Loading...');
    });

    it("can display an empty message when topic property is empty", () => {
        const topics = [];
        const wordCloudElement = TestUtils.renderIntoDocument(
            <WordCloud topics={topics} />
        );
        const wordCloudDOMNode = ReactDOM.findDOMNode(wordCloudElement);

        expect(wordCloudDOMNode.textContent).toEqual('Loading...');
    });

    it("can display an error message when an error is passed in", () =>  {
        const topics = [];
        const error = {simple: "Error message", detail: {"error": "nasty error"}};
        const wordCloudElement = TestUtils.renderIntoDocument(
            <WordCloud topics={topics} error={error} />
        );
        const wordCloudDOMNode = ReactDOM.findDOMNode(wordCloudElement);

        expect(wordCloudDOMNode.textContent).toEqual(error.simple);
    });
});