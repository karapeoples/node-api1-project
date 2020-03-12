import React, { useState } from 'react'
import axios from 'axios'
import EditForm from './EditForm'

const Card = ({ name, id, bio, info, setInfo }) => {
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
				return axios.get('http://localhost:4000/api/users')
			})
			.then(res => {
				setInfo(res.data)
			})

			.catch(err => console.log('There is an error', err))
	}
	return (
		<section className='inside-card-section'>
			{turn === true ? (
				<div>
					<EditForm
						editItem={editItem}
						setEditItem={setEditItem}
						info={info}
						setInfo={setInfo}
						turn={turn}
						setTurn={setTurn}
					/>
				</div>
			) : (
				<div className='inside-card'>
					<div className='inside-buttons'>
						<button onClick={handleDelete}>X</button>
						<button onClick={handleClick}>Edit</button>
					</div>

					<div className='inside-text'>
						<p>{bio}</p>
						<h1>{name}</h1>
					</div>
				</div>
			)}
		</section>
	)
}
export default Card
