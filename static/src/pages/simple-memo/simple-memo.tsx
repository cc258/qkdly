import React, {
	memo,
	useState,
	useEffect,
	useCallback,
	useContext,
	useReducer,
} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

interface SimpleProps {
	name?: string
	age?: number
}

interface SimpleStates {
	stars?: number
	widgetData?: any
}

// 几种定义function component的方式
// function Simple(props: SimpleProps) {
// const Simple: React.FC<SimpleProps> = () => {
// const Simple: React.FC<SimpleProps> = props => {
// const Simple: React.FC<SimpleProps> = ({name, age}) => {
const Simple: React.FC<SimpleProps> = ({ name = 'leo', age = 18 }) => {
	const [stars, setStars] = useState<number>(0)
	const [widgetData, setWidgetData] = useState<any>([])

	// 每次re-render都会创建一次。
	function onStars() {
		setStars(stars + 10)
	}

	function getWidgetData() {
		axios
			.post('http://localhost:8090/api/v1/widget', {
				params: {
					id: 12345,
				},
			})
			.then((res) => {
				setWidgetData(res)
			})
	}

	// useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

	const getWidgetData_cb = useCallback(() => {
		fetch('https://api.github.com/users')
			.then((res) => res.json())
			.then((data) => {
				setWidgetData(data)
			})
	}, [])

	useEffect(() => {
		getWidgetData_cb()
	}, [])

	return (
		<section className="pages">
			<h1 onClick={onStars}>counts {stars} stars</h1>
			<ul className="memo-list">
				{widgetData.map((item: any, key: string) => {
					return <li>{item.login}</li>
				})}
			</ul>
			<MemoChildOne />
			<MemoChildTwo />
		</section>
	)
}

const ChildOne = () => {
	console.log('Child one rendering')
	return <h2>Child One</h2>
}

const ChildTwo = () => {
	console.log('Child two rendering')
	return <h2>Child two</h2>
}

const MemoChildOne = memo(ChildOne)
const MemoChildTwo = memo(ChildTwo)
const SimpleMemo = memo(Simple)

export default SimpleMemo
