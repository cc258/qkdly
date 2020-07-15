import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Product from './pages/product/product'
import Contact from './pages/contact/contact'

class Routers extends React.Component {
	render() {
		return (
			<Router basename={window.__POWERED_BY_QIANKUN__ ? '/react15' : '/'}>
				<nav className="nav">
					<ul>
						<li>
							<Link to="/">product</Link>
						</li>
						<li>
							<Link to="/contact">contact</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route exact path="/" component={Product} />
					<Route exact path="/contact" component={Contact} />
				</Switch>
			</Router>
		)
	}
}

export default Routers
