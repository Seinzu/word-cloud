import React from 'react';

export default class TopicSummary extends React.Component {
    render() {
        const neutralMentions =
            typeof this.props.topic.sentiment.neutral !== "undefined" ?
                this.props.topic.sentiment.neutral :
                0;
        const positiveMentions =
            typeof this.props.topic.sentiment.positive !== "undefined" ?
                this.props.topic.sentiment.positive :
                0;
        const negativeMentions =
            typeof this.props.topic.sentiment.negative !== "undefined" ?
                this.props.topic.sentiment.negative :
                0;
        const totalMentions = positiveMentions + neutralMentions + negativeMentions;
        return (
            <aside id="topic-summary" className="col-md-4 well">
                <h4>Information on topic "{this.props.topic.label}"</h4>
                <dl className="dl-horizontal">
                    <dt>Total mentions:</dt><dd>{totalMentions}</dd>
                    <dt>Positive mentions:</dt><dd className="positive">{positiveMentions}</dd>
                    <dt>Neutral mentions:</dt><dd className="neutral">{neutralMentions}</dd>
                    <dt>Negative mentions:</dt><dd className="negative">{negativeMentions}</dd>
                </dl>
            </aside>
        );
    }
}