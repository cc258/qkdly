import {
	registerMicroApps,
	runAfterFirstMounted,
	setDefaultMountApp,
	start,
	initGlobalState,
} from 'qiankun'

import './index.less'

// for angular subapp
// import 'zone.js';

/**
 * 主应用 **可以使用任意技术栈**
 */
import render from './reactRender'

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true })

const loader = (loading) => render({ loading })

/**
 * Step2 注册子应用
 */

registerMicroApps(
	[
		{
			name: 'react16',
			entry: '//localhost:7001',
			container: '#subapp-viewport',
			loader,
			activeRule: '/react16',
		},
		{
			name: 'react15',
			entry: '//localhost:7002',
			container: '#subapp-viewport',
			loader,
			activeRule: '/react15',
		},
		// {
		// 	name: 'vue',
		// 	entry: '//localhost:7101',
		// 	container: '#subapp-viewport',
		// 	loader,
		// 	activeRule: '/vue',
		// },
		// {
		// 	name: 'angular9',
		// 	entry: '//localhost:7103',
		// 	container: '#subapp-viewport',
		// 	loader,
		// 	activeRule: '/angular9',
		// },
		// {
		// 	name: 'purehtml',
		// 	entry: '//localhost:7104',
		// 	container: '#subapp-viewport',
		// 	loader,
		// 	activeRule: '/purehtml',
		// },
	],
	{
		beforeLoad: [
			(app) => {
				console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
			},
		],
		beforeMount: [
			(app) => {
				console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
			},
		],
		afterUnmount: [
			(app) => {
				console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
			},
		],
	}
)

const { onGlobalStateChange, setGlobalState } = initGlobalState({
	user: 'qiankun',
})

onGlobalStateChange((value, prev) =>
	console.log('[onGlobalStateChange - master]:', value, prev)
)

setGlobalState({
	ignore: 'master',
	user: {
		name: 'master',
	},
})

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/react16')

/**
 * Step4 启动应用
 */
start()

runAfterFirstMounted(() => {
	console.log('[MainApp] first app mounted')
})
