import React, { Suspense } from 'react'
import { hot } from 'react-hot-loader'

// international language
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import messages from '../lang/en'

import Routers from './routers'
import store from './store'

import './assets/app.scss'

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<IntlProvider locale="en" messages={messages}>
					<Suspense fallback={<div />}>
						<Routers />
					</Suspense>
				</IntlProvider>
			</Provider>
		)
	}
}
export default hot(module)(App)
