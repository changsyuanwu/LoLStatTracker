import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import MatchHistory from "../MatchHistory/MatchHistory";
import MainPage from "../MainPage/MainPage";
import Register from "../Register/Register";
import Login from "../Login/Login";

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Dashboard />
				<Redirect
					to={{
						pathname: "/mainpage",
					}}
				/>
			</Route>
            <Route exact path="/mainpage">
				<MainPage />
			</Route>
            <Route exact path="/dashboard">
				<Dashboard />
			</Route>
			<Route exact path="/match-history">
				<MatchHistory />
			</Route>
			<Route exact path="/register">
				<Register />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
		</Switch>
	);
}
