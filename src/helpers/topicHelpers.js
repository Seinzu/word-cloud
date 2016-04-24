/**
 * Make a judgement as to the tenor of the sentiment that the provided topic has.
 *
 * Topics with a sentiment > 60 have a positive tenor, topics with a sentiment < 40 have a negative tenor,
 * all other topics have a neutral tenor.
 *
 * @param topic
 * @returns {*}
 */
export function calculateSentiment(topic) {
    if (topic.sentimentScore > 60) {
        return 'positive';
    } else if (topic.sentimentScore < 40) {
        return 'negative';
    } else {
        return 'neutral';
    }
}

/**
 * Determine the prominence of the provided topic.
 * @param topic
 * @param allTopics
 */
export function calculateProminence(topic, allTopics) {
    const orderedTopics = allTopics.sort((a, b) => {
        return a.volume > b.volume ? 1 : -1;
    });
    const interval = allTopics.length / 6;
    const topicPosition = orderedTopics.reduce((left, item, idx) => {
        if (item.id === topic.id) {
            return idx + 1;
        }
        return left;
    }, -1);
    return Math.ceil(topicPosition / interval);
}