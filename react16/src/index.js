import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'


// render(<App />, document.getElementById("app"));

function render(props) {
	const { container } = props
	ReactDOM.render(
		<App />,
		container
			? container.querySelector('#root')
			: document.querySelector('#root')
	)
}

function storeTest(props) {
	props.onGlobalStateChange(
		(value, prev) =>
			console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
		true
	)
	props.setGlobalState({
		ignore: props.name,
		user: {
			name: props.name,
		},
	})
}

if (!window.__POWERED_BY_QIANKUN__) {
	render({})
}

export async function bootstrap() {
	console.log('[react16] react app bootstraped')
}

export async function mount(props) {
	console.log('[react16] props from main framework', props)
	storeTest(props)
	render(props)
}

export async function unmount(props) {
	const { container } = props
	ReactDOM.unmountComponentAtNode(
		container
			? container.querySelector('#root')
			: document.querySelector('#root')
	)
}
