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
    // Put the topics in order according to the total number of mentions (volume measures this).
    const orderedTopics = allTopics.slice(0).sort((a, b) => {
        return a.volume > b.volume ? 1 : -1;
    });
    // Work out the position of the topic that was passed in within the ordered list.
    const topicPosition = orderedTopics.reduce((left, item, idx) => {
        if (item.id === topic.id) {
            // Add 1 in order to avoid the fence post problem.
            return idx + 1;
        }
        return left;
    }, -1);
    // There are six possible sizes, work out how many items belong to each size group.
    const interval = allTopics.length / 6;
    // Each group should have {interval} members in it, divide our position by interval to determine our group.
    // We round up because groups are named by integer and we are in the group above the result of the calculation.
    return Math.ceil(topicPosition / interval);
}