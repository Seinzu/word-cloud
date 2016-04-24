jest.unmock('../src/components/word');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Word from '../src/components/word';

describe('Word', () => {
    it('displays the passed label', () => {
        const passedTopic = "Topic";
        const wordElement = TestUtils.renderIntoDocument(
            <Word label={passedTopic} />
        );

        const wordDOMNode = ReactDOM.findDOMNode(wordElement);

        expect(wordDOMNode.textContent).toEqual(passedTopic);
    });

    it('has class sentiment-positive when a positive sentiment tenor is passed in', () => {
        const sentimentTenor = 'positive';
        const wordElement = TestUtils.renderIntoDocument(<Word label="topic" sentimentTenor={sentimentTenor} />);

        const wordDOMNode = ReactDOM.findDOMNode(wordElement);

        expect(wordDOMNode.className).toContain("sentiment-positive");
    });

    it('has class sentiment-neutral when a neutral sentiment tenor is passed in', () => {
        const sentimentTenor = 'neutral';
        const wordElement = TestUtils.renderIntoDocument(<Word label="topic" sentimentTenor={sentimentTenor} />);
        const wordDOMNode = ReactDOM.findDOMNode(wordElement);

        expect(wordDOMNode.className).toContain('sentiment-neutral');
    });

    it('has class sentiment-negative when a negative sentiment tenor is passed in', () => {
        const sentimentTenor = 'negative';
        const wordElement = TestUtils.renderIntoDocument(<Word label="topic" sentimentTenor={sentimentTenor} />);
        const wordDOMNode = ReactDOM.findDOMNode(wordElement);
        expect(wordDOMNode.className).toContain('sentiment-negative');
    });

    it('is the size that is passed in', () => {
        const sentimentTenor = 'neutral';
        const size = 1;
        const wordElement = TestUtils.renderIntoDocument(<Word label="topic"
                                                               sentimentTenor={sentimentTenor}
                                                               size={size}
        />);
        const wordDOMNode = ReactDOM.findDOMNode(wordElement);

        expect(wordDOMNode.className).toContain('word-1');
    });

    it('calls the method passed as the onClick prop when clicked', () => {
        const onClickFunc = jest.genMockFunction();
        const wordElement = TestUtils.renderIntoDocument(<Word label="topic"
                                                               id="1"
                                                               sentimentTenor="neutral"
                                                               size="1"
                                                               onTopicSelect={onClickFunc}/>
        );
        const wordDOMNode = ReactDOM.findDOMNode(wordElement);
        TestUtils.Simulate.click(wordDOMNode);
        expect(onClickFunc).toBeCalled();
    });

    it('can pass it\'s id to the onClick prop when clicked', () => {
        const callback = (id) => {
            expect(id).toEqual('1');
        };
        const wordElement = TestUtils.renderIntoDocument(<Word label="topic"
                                                               id="1"
                                                               sentimentTenor="neutral"
                                                               size="1"
                                                               onTopicSelect={callback}/>
                                                               );
        const wordDOMNode = ReactDOM.findDOMNode(wordElement);
        TestUtils.Simulate.click(wordDOMNode);
    });
});