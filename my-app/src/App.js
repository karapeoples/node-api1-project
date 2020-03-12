import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Card from './components/Card'
import AddForm from './components/AddForm'
function App() {
	const [info, setInfo] = useState([])

	useEffect(() => {
		axios
			.get('http://localhost:4000/api/users')
			.then(res => {
				console.log('API Is Here: ', res.data)
				setInfo(res.data)
			})
			.catch(error => {
				console.log('Whoops go back, thats an error!', error)
			})
	}, [])

	return (
		<div className='App'>
			{info.map((list, index) => {
				return (
					<div key={index}>
						<Card id={list.id} name={list.name} bio={list.bio} />
					</div>
				)
			})}
			<div>
				<AddForm />
			</div>
		</div>
	)
}

export default App
