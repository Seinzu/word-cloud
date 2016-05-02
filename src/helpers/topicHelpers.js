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

// Taken from Mike Bostock's (https://bost.ocks.org/mike/shuffle/) implementation of the Fisher-Yates algorithm.
// This allows us to randomise the order of the provided topics, which will make the word cloud more interesting.
export function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

export function fetchTopics() {
    const hostname = process.env.HOSTNAME || "localhost";
    const port     = process.env.PORT || 8000;
    return new Promise((resolve, reject) => {
        fetch('http://' + hostname + ':' + port + '/topics.json')
            .then((response) => response.json())
            .then((json) => {
                const topics = json.topics.map((topic, idx, context) => {
                    var sentimentTenor = 'neutral', size = 1;
                    try {
                        sentimentTenor = calculateSentiment(topic);
                        size = calculateProminence(topic, context);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        return Object.assign({}, topic, {sentimentTenor, size});
                    }
                });
                resolve(topics);
            })
            .catch((error) => reject(error));
    });
}