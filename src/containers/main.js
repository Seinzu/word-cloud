import React from "react";
import {bindActionCreators} from 'redux';
import WordCloud from "../components/wordCloud";
import TopicSummary from "../components/topicSummary";
import {connect} from 'react-redux';
import * as actions from '../actions/topicActions';

/**
 * Main React application entry-point for both the server and client.
 *
 * This class is a smart component that connects to the redux infrastructure.
 */
class Main extends React.Component {
    constructor() {
        super();
    }

    /**
     * Fires when the component is mounted in the browser.
     *
     * We use this method to get the required topics.
     */
    componentDidMount() {
        this.props.dispatch(actions.getTopics());
    }

    /**
     * Dispatch the select topic event.
     * @param topic
     */
    selectTopic(id) {
        this.props.dispatch(actions.clickTopic(id, Date.now()));
    };

    /**
     * Render the word cloud (and potentially the topic summary).
     * @returns {XML}
     */
	render () {
        const error = typeof this.props.error !== "undefined" ? this.props.error : false;
        return (
            <div className="container-fluid">
                <div className="row">
                    <WordCloud onTopicSelect={(id) => this.selectTopic(id)}
                               topics={this.props.topics} error={error} />
                    {this.props.selectedTopic !== false ? (<TopicSummary topic={this.props.selectedTopic}/>) : ''}
                </div>
            </div>
        );
	}
}

const mapStateToProps = state => {
    const {topics, selectedTopic, error} = state.TopicReducer;
    return {topics, selectedTopic, error};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
        dispatch
    };
};

// Connect to the bound store.
const Container = connect(mapStateToProps, mapDispatchToProps)(Main);

export default Container;
