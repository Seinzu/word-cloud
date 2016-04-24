import React from "react";
import {Router, Route} from "react-router";

import Main from "./main";

/**
 * The React Router routes for both the server and the client.
 */
export default (
	<Route path="/" component={Main} name="wordcloud" />
);
