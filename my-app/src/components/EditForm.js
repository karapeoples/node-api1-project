import React, { useState } from 'react'
import axios from 'axios'

const EditForm = ({ editItem, setEditItem }) => {
	console.log(editItem)

	const handleChange = e => {
		setEditItem({ ...editItem, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		axios
			.put(`http://localhost:4000/api/users/${editItem.id}`, editItem)
			.then(res => {
				console.log(res)
				setEditItem(editItem)
				window.location.reload(false)
			})
			.catch(err => console.log('There is an error', err))
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type='text' name='name' value={editItem.name} onChange={handleChange} />
			<input type='text' name='bio' value={editItem.bio} onChange={handleChange} />
			<button>Update</button>
		</form>
	)
}

export default EditForm
