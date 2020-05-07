//IMPORTS
const express = require('express') //imports syntax used for Node
const shortid = require('shortid') //imports syntax used for Node

//SETUP FOR USING THE SERVER
const server = express()

//MIDDLEWARE ALWAYS BEFORE ENDPOINT INFORMATION
server.use(express.json())

//Code To Check Running Server is Working
server.get('/', (req, res) => {
	res.status(200).json('Welcome to NODE API 1')
})

//Project EndPoint Code (Not Including Errors as they were not covered and I am unsure how to do them without a DB 😇)
let users = []

//Post (Works on PostMan)
server.post('/api/users', (req, res) => {
	const userInfo = req.body
	userInfo.id = shortid.generate()

	users.push(userInfo)

	!userInfo.name || !userInfo.bio
		? res.status(400).json({ error: 'Please provide name and bio for the user' })
		: res.status(201).json(userInfo)
})

//GET (Works on PostMan)
server.get('/api/users', (req, res) => {
	res.status(200).json(users)
})

//GET BY ID (Works on Postman)
server.get('/api/users/:id', (req, res) => {
const { id } = req.params
const found = users.find((user) => user.id === id)
if (found) {
	res.status(200).json(found)
} else {
	res.status(404).json({ error: 'The USER does NOT Exist' })
}
})

//DELETE (Works on Postman)
server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params
	const found = users.find((user) => user.id === id)
	if (found) {
		users = users.filter((user) => user.id !== id)
		res.status(200).json(found)
	} else {
		res.status(404).json({ error: 'The USER does NOT Exist' })
	}
})

//PUT(Works on Postman)
server.put('/api/users/:id', (req, res) => {
	const { id } = req.params
	const body = req.body

	let index = users.findIndex((user) => user.id === id)
	if (index !== -1) {
		users[index] = body
		res.status(200).json(users[index])
	} else {
		res.status(404).json({ error: 'The USER does Not Exist' })
	}
})

//Server Code
const PORT = 4994
server.listen(PORT, () => console.log(`\n*** API on http://localhost:${PORT} ***\n`))
