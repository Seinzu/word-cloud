import React from "react";
import {render} from "react-dom";
import {hashHistory, Router} from "react-router";
import routesContainer from "containers/routes";
import {Provider} from "react-redux";
import createBrowserHistory from 'history/lib/createBrowserHistory';
import topicStore from 'stores/topicStore';
import less from "!style!css!less!./theme/main.less";
const history = hashHistory;
const debug = __DEV__ || false;
const store = topicStore(debug);
const reactRoot = window.document.getElementById("react-root");
render(
    <Provider store={store}>
        <Router children={routesContainer} history={history} />
    </Provider>, reactRoot);

/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (process.env.NODE_ENV !== "production") {
	if (!reactRoot.firstChild || !reactRoot.firstChild.attributes ||
	    !reactRoot.firstChild.attributes["data-react-checksum"]) {
		console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
	}
}

