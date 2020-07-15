import React, { Suspense } from 'react'
import Routers from './routers'

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
