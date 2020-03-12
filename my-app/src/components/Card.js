import React, { useState } from 'react'
import axios from 'axios'
import EditForm from './EditForm'

const Card = ({ name, id, bio }) => {
	const [turn, setTurn] = useState(false)
	const [editItem, setEditItem] = useState({})

	const handleClick = () => {
		setTurn(true)
		axios
			.get(`http://localhost:4000/api/users/${id}`)
			.then(res => {
				console.log(res)
				setEditItem(res.data)
			})
			.catch(err => console.log('Get By Id Error', err))
	}

	const handleDelete = e => {
		e.preventDefault()
		axios
			.delete(`http://localhost:4000/api/users/${id}`)
			.then(res => {
				console.log(res)
				window.location.reload(false)
			})
			.catch(err => console.log('There is an error', err))
	}
	return (
		<div>
			{turn === true ? (
				<div>
					<EditForm editItem={editItem} setEditItem={setEditItem} />
				</div>
			) : (
				<div>
					<div>
						<button onClick={handleClick}>Edit</button>
						<button onClick={handleDelete}>X</button>
					</div>

					<div>
						<h1>{name}</h1>
						<p>{bio}</p>
					</div>
				</div>
			)}
		</div>
	)
}
export default Card
