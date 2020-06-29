import React, { Component } from 'react'
import axios from 'axios'

interface LifeCycleProps {
	name?: string
}
interface LifeCycleStates {
	number?: number
	users?: Array<any>
	api?: Array<any>
}

export default class LifeCycle extends Component<
	LifeCycleProps,
	LifeCycleStates
> {
	static defaultProps = {
		name: '计数器',
	}
	constructor(props: LifeCycleProps) {
		super(props)
		this.state = { number: 0, users: [] }
		console.log('1. constructor 初始化 props and state')
	}
	static getDerivedStateFromProps() {}
	//componentDidMount在渲染过程中永远只有执行一次
	//一般是在componentDidMount执行副作用，进行异步操作
	componentDidMount() {
		console.log('3. componentDidMount 组件挂载完成')
		this.getUsers()
	}
	shouldComponentUpdate(nextProps: LifeCycleProps, nextState: LifeCycleStates) {
		console.log('Counter', nextProps, nextState)
		console.log('4. shouldComponentUpdate 询问组件是否需要更新')
		return true
	}
	componentWillUpdate(nextProps: LifeCycleProps, nextState: LifeCycleStates) {
		console.log('5. componentWillUpdate 组件将要更新')
	}
	componentDidUpdate(prevProps: LifeCycleProps, prevState: LifeCycleStates) {
		console.log('6. componentDidUpdate 组件更新完毕')
	}
	add = () => {
		this.setState({ number: this.state.number })
	}

	getUsers = () => {
		return axios.get('https://api.github.com/users').then((res) => {
			console.log('+++++++++++++++++++++++++++', res)
			this.setState({ users: res.data })
		})
	}

	getApi = () => {
		return axios.get('/users/12345').then((res) => {
			console.log('+++++++++++++++++++++++++++', res)
			this.setState({ api: res.data })
		})
	}
	render() {
		console.log('2.render渲染，也就是挂载++++++++++++++++++', this.state)
		return (
			<div style={{ border: '5px solid red', padding: '5px' }}>
				<p>
					{this.props.name}:{this.state.number}
				</p>
				<button onClick={this.add}>+</button>
				<ul>
					{this.state.users.map((user) => (
						<li>{user.login}</li>
					))}
				</ul>
				{this.state.number % 2 == 0 && (
					<SubCounter number={this.state.number} />
				)}

				<button onClick={this.getApi} />
			</div>
		)
	}
}

interface SubCounterTypes {
	number?: number
}

class SubCounter extends Component<SubCounterTypes, SubCounterTypes> {
	constructor(props: SubCounterTypes) {
		super(props)
		this.state = { number: 0 }
	}
	componentWillUnmount() {
		console.log('SubCounter componentWillUnmount')
	}
	//调用此方法的时候会把新的属性对象和新的状态对象传过来
	shouldComponentUpdate(
		nextProps: SubCounterTypes,
		nextState: SubCounterTypes
	) {
		console.log('SubCounter', nextProps, nextState)
		if (nextProps.number % 3 == 0) {
			return true
		} else {
			return false
		}
	}
	//UNSAFE componentWillReceiveProp 组件收到新的属性对象
	componentWillReceiveProps() {
		console.log('SubCounter 1.componentWillReceiveProps')
	}
	render() {
		console.log('SubCounter  2.render')
		return (
			<div style={{ border: '5px solid green' }}>
				<p>{this.props.number}</p>
			</div>
		)
	}
}
