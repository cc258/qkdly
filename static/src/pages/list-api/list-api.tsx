import React, { memo, useState, useEffect, useContext, useReducer } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import './list-api.scss'

const getSessionStorage = () => {
	const s = sessionStorage.getItem('listapi')
	return s ? JSON.parse(s) : {}
}

const ListApi = (props: any) => {
	const searchHistory = getSessionStorage()
	const [name, setName] = useState(searchHistory.name)
	const [vin, setVin] = useState(searchHistory.vin)

	const startSearch = () => {
		getList()
		saveSessionStorage()
	}

	const saveSessionStorage = () => {
		sessionStorage.setItem('listapi', JSON.stringify({ name, vin }))
	}

	const getList = () => {
		axios
			.post('http://localhost:8090/api/v1/widget', {
				params: {
					name,
					vin,
				},
			})
			.then(res => {
				console.log(res)
			})
	}

	useEffect(() => {
		getList()
	}, [])

	return (
		<section className="pages list-api">
			<div className="filters">
				<label>
					<span>Name</span>
					<input
						onChange={e => setName(e.target.value)}
						type="text"
						value={name}
					/>
				</label>
				<label>
					<span>VIN</span>
					<input
						onChange={e => setVin(e.target.value)}
						type="text"
						value={vin}
					/>
				</label>

				<button onClick={startSearch}>Search</button>
			</div>
			<div className="container">
				<h2>Catagry</h2>
				<ul className="catagry">
					<li>aaaaa</li>
					<li>aaaaa</li>
					<li>aaaaa</li>
					<li>aaaaa</li>
				</ul>

				<h2>List</h2>
				<div className="list">
					<ul>
						<li>Name</li>
						<li>Vin</li>
					</ul>
					<ul>
						<li>Leo</li>
						<li>V1111111</li>
					</ul>
					<ul>
						<li>Kevin</li>
						<li>V2222222</li>
					</ul>
					<ul>
						<li>Rogar</li>
						<li>V3333333</li>
					</ul>
				</div>

				<ul className="pagination">
					<li>1</li>
					<li>2</li>
				</ul>
			</div>
		</section>
	)
}

export default memo(ListApi)
