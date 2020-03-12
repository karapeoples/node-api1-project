import React, { useState } from 'react'
import axios from 'axios'

const AddForm = ({info, setInfo}) => {
	const [newItem, setNewItem] = useState({
		name: '',
		bio: '',
	})

	const handleChange = e => {
		setNewItem({ ...newItem, [e.target.name]: e.target.value })
	}
	const handleSubmit = e => {
		e.preventDefault()
		setNewItem({ ...newItem })
    axios
      .post('http://localhost:4000/api/users', newItem)
      .then(res => {
        console.log(res)
        setNewItem(newItem)
        return(
        axios
          .get("http://localhost:4000/api/users")
      )})
      .then(res => {
        setInfo(res.data)
      })
			.catch(err => console.log('There is an error', err))
      
        
      
          
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type='text' name='name' value={newItem.name} onChange={handleChange} />
			<input type='text' name='bio' value={newItem.bio} onChange={handleChange} />
			<button>Add</button>
		</form>
	)
}

export default AddForm
