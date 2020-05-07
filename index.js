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
  const body = req.body
  users.id = shortid.generate()
  
  users.push(body)

  !body.name || !body.bio ? res.status(400).json({ error: 'Please provide name and bio for the user' }) : res.status(201).json(body)
})

//GET (Works on PostMan)
server.get('/api/users', (req, res) => {
  res.status(200).json(users)
})

//GET BY ID (Works on PostMan??Not sure how to check with ShortID) In process of review
server.get('api/users/:id', (req, res) => {
  const { id } = req.params
  
  !id ? res.status(404).json({ error: 'The USER does NOT Exist' }) :
    res.status(200).json(req.body)

})

//DELETE (Works on PostMan?? Not sure how to check with ShortID) In process of review
server.delete('/api/user/:id', (req, res) => {
  const { id } = req.params
  
  !id ? res.status(404).json({ error: 'The USER does NOT Exist' }) : res.status(200).json(req.body)

})


//PUT(Works on PostMan?? Not sure how to check with ShortID) In process of review
server.put('/api/user/:id', (req, res) => {
  const { id } = req.params
  const body = req.body

  !id ? res.status(404).json({ error: 'The USER does NOT Exist' }) :
    !body.name || !body.bio ? res.status(400).json({ error: "Provide Name and Bio0" }) :
      res.status(200).json(body)
})



//Server Code
const PORT = 4994
server.listen(PORT, () => console.log(`\n*** API on http://localhost:${PORT} ***\n`))
