import React from 'react';
import ReactDOM from 'react-dom';

/**
 * The Word class handles the view related functionality required for displaying a single word in a word cloud.
 * Statistical information about a word is handled in a separate view.
 */
export default class Word extends React.Component {

    /**
     * Render the Word.
     * @returns {XML}
     */
    render() {
        const sentiment = "sentiment-" + this.props.sentimentTenor;
        const size = "word-" + this.props.size;
        const className = [sentiment, size].join(" ");
        return (
            <span onClick={() => this.props.onTopicSelect(this.props.id)} className={className}>
                {this.props.label}
            </span>
        );
    }

}