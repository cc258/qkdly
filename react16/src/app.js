import React, { Suspense } from 'react'
import Routers from './routers'

import { createBrowserHistory } from 'history';
import { Route } from 'react-router-dom'

import {
	// or createReactRouterV4Options
	createReactRouterV5Options,
	getWebInstrumentations,
	initializeFaro,
	ReactIntegration,
	ReactRouterVersion,
} from '@grafana/faro-react';

const history = createBrowserHistory();

initializeFaro({
	// Mandatory, the URL of the Grafana collector
	url: 'my/collector/url',

	// Mandatory, the identification label of your application
	app: {
		name: 'my-react-app',
	},

	// ...

	instrumentations: [
		// Load the default Web instrumentations
		...getWebInstrumentations(),

		new ReactIntegration({
			// or createReactRouterV4Options
			router: createReactRouterV5Options({
				history, // the history object used by react-router
				Route, // Route component imported from react-router package
			}),
		}),
	],
});

class App extends React.Component {
	render() {
		return (
			<Suspense fallback={<div />}>
				<Routers />
			</Suspense>
		)
	}
}
export default App
