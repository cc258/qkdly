import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Home from './pages/home/home'
import About from './pages/about/about'
import Hooks from './pages/hooks/hooks'

class Routers extends React.Component {
	render() {
		return (
			<Router basename={window.__POWERED_BY_QIANKUN__ ? '/react16' : '/'}>
				<nav className="nav">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/hooks">Hooks</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/hooks" component={Hooks} />
				</Switch>
			</Router>
		)
	}
}

export default Routers
