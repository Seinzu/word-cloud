import babelPolyfill from "babel-polyfill";
import express from "express"
import React from "react";
import ReactDOM from "react-dom/server";
import * as ReactRouter from "react-router";
import * as Actions from './actions/topicActions';
import CreateLocation from "history/lib/createLocation";
import {Provider} from "react-redux";
import topicStore from "stores/topicStore.js";

import routesContainer from "containers/routes";

// This is the entry point for the server.

try {
	const app      = express();
	const hostname = process.env.HOSTNAME || "localhost";
	const port     = process.env.PORT || 8000;
	const scriptHost = hostname;
	const scriptPort = __DEV__ ? 8080 : port;
	let   routes   = routesContainer;

    app.use(express.static(process.cwd() + '/static'));

	app.set('view engine', 'pug');

    app.use((request, response) => {
        const location = CreateLocation(request.url);
        const store = topicStore();
		store.dispatch(Actions.getTopics());
        ReactRouter.match({routes, location}, (error, redirect, props) => {
            if (!props) {
                response.charset = 'utf-8';
                return response.header("Content-Type", "application/json; charset=utf-8").
                    status(404).end('Resource not found.');
            }
            const Component = (
                <Provider store={store}>
                    <ReactRouter.RouterContext {...props} />
                </Provider>
            );

            const componentHTML = ReactDOM.renderToString(Component);
			const jsSrc = 'http://'+ scriptHost + ':' + scriptPort + '/dist/client.js';
            response.render('index', {jsSrc, componentHTML});
    	});
	});

	app.listen(port, () => {
		console.info("==> Server is listening");
		console.info("==> Go to http://%s:%s", hostname, port);
	});

	if (__DEV__) {
		// We are using Hot Module Reloading in the dev environemnt so handle this.
        if (module.hot) {
			console.log("[HMR] Waiting for server-side updates");

			module.hot.accept("containers/routes", () => {
				routes = require("containers/routes");
			});

			module.hot.addStatusHandler((status) => {
				if (status === "abort") {
					setTimeout(() => process.exit(0), 0);
				}
			});
		}
	}
}
catch (error) {
	console.error(error.stack || error);

	throw error;
}
