const db = require('./data/db.js')
const express = require('express')
const cors = require('cors')
const server = express()

server.listen(4000, () => {
	console.log('=== server listening on port 4000 ===')
})

server.use(express.json())
server.use(cors())

//Post Request to /api/users
server.post('/api/users', (req, res) => {
	const { name, bio } = req.body
	!name || !bio
		? res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
		: db
				.insert(req.body)
				.then(user => {
					res.status(201).json(user)
				})
				.catch(err => {
					res.status(500).json({
						error: 'There was an error while saving the user to the database',
						err,
					})
				})
})

//Get All Users
server.get('/api/users', (req, res) => {
	db
		.find()
		.then(user => {
			res.status(200).json(user)
		})
		.catch(err => {
			res.status(500).json({ errorMessage: 'The users information could not be retrieved.', success: false, err })
		})
})

//Get By ID
server.get('/api/users/:id', (req, res) => {
	const id = req.params.id
	db
		.findById(id)
		.then(user => {
			user
				? res.status(200).json(user)
				: res.status(404).json({ errorMessage: 'The user with specified ID does not exist' })
		})
		.catch(err => {
			res.status(500).json({ errorMessage: 'The users information could not be retrieved.', success: false, err })
		})
})

//Delete User
server.delete('/api/users/:id', (req, res) => {
	const id = req.params.id
	db
		.remove(id)
		.then(user => {
			user
				? res.status(200).json(user)
				: res.status(404).json({ errorMessage: 'The user with specified ID does not exist' })
		})
		.catch(err => {
			res.status(500).json({ errorMessage: 'The user could not be removed.', success: false, err })
		})
})

//Update User (Put Request)
server.put('/api/users/:id', (req, res) => {
	const id = req.params.id
	const { name, bio } = req.body

	!name || !bio
		? res.status(400).json({ errorMessage: 'Please provide Name and Bio for user' })
		: db
				.update(id, req.body)
				.then(user => {
					user
						? res.status(200).json(user)
						: res.status(404).json({ errorMessage: 'The user with specified ID does not exist' })
				})
				.catch(err => {
					res.status(500).json({ errorMessage: 'The user information could not be modified.', success: false, err })
				})
})
