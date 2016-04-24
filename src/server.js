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
	let   routes   = routesContainer;

    app.use(express.static(process.cwd() + '/static'));

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
            const body = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Word cloud</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
              integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7"
              crossorigin="anonymous">
      </head>
      <body>
        <div class='page-header'>
        	<h1>Word cloud</h1>
        </div>
        <div id='react-root'>${componentHTML}</div>
        <script type='text/javascript' src="http://localhost:8080/dist/client.js"></script>
      </body>
    </html>
      `
            response.end(body);
        })
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
