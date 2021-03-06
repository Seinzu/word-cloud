import React from 'react';
import ReactDOM from 'react-dom';
import Word from './word';

/**
 * The word cloud takes a
 */
export default class WordCloud extends React.Component {

    handleChildClick() {
        this.props.onTopicSelect();
    };

    render() {
        if (typeof this.props.error !== "undefined" && this.props.error && typeof this.props.error.simple !== "undefined") {
            return (
                <div className="alert alert-danger">{this.props.error.simple}</div>
            );
        }
        if (typeof this.props.topics === "undefined" || this.props.topics.length === 0) {
            return (
                <div>Loading...</div>
            );
        }
        return (
            <section className="col-md-8" id="word-cloud">
                {this.props.topics.map((topic) => this.renderTopic.apply(this, [topic]))}
            </section>
        );
    }

    renderTopic(topic) {
        return (<Word key={topic.id}
                      id={topic.id}
                      label={topic.label}
                      sentimentTenor={topic.sentimentTenor}
                      size={topic.size}
                      onTopicSelect={this.props.onTopicSelect}
                /> );
    }
};