import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { HomeProps } from '.'

const Home: React.FC<HomeProps> = () => {
	const dispatch = useDispatch()
	const props = useSelector((state: any) => state.home)
	const { formatMessage: f } = useIntl()

	const [apis, setApis] = useState<any>([])

	const apiData = [
		{
			id: 1,
			name: 'name 1',
			state: 'INACTIVE',
			versions: [
				{
					version: 1.1,
					state: 'INACTIVE',
				},
				{
					version: 1.1,
					state: 'DELETED',
				},
			],
		},
		{
			id: 2,
			name: 'name 2',
			versions: [
				{
					version: 1.2,
					state: 'DELETED',
				},
			],
		},
		{
			id: 3,
			name: 'name 3',
			state: 'DELETED',
			versions: [
				{
					version: 1.2,
					state: 'DELETED',
				},
			],
		},
	]

	function filterApi(data: any) {
		setApis(data.filter((x: any) => !(x.state && x.state === 'INACTIVE')))
	}

	// function filterApi(data: any) {
	// 	setApis(
	// 		data.filter((x: any) =>
	// 			x.versions.some((y: any) => y.state && y.state === 'ACTIVE')
	// 		)
	// 	)
	// }

	useEffect(() => {
		filterApi(apiData)
	}, [])

	return (
		<div className="pages home" id="home">
			<h1>{f({ id: 'mm' })}123</h1>
			<h1>
				<pre>{JSON.stringify(apis, null, 4)}</pre>
			</h1>
			<h1>In the end, </h1>
			<h2>everything will have a happy ending. </h2>
			<h3>If it's not happy, </h3>
			<h4>then it's not the end.</h4>
		</div>
	)
}

export default Home
