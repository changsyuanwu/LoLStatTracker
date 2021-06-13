import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import MatchHistory from "../MatchHistory/MatchHistory";

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Dashboard />
				<Redirect
					to={{
						pathname: "/dashboard",
					}}
				/>
			</Route>
            <Route exact path="/dashboard">
				<Dashboard />
			</Route>
			<Route exact path="/match-history">
				<MatchHistory />
			</Route>
		</Switch>
	);
}
