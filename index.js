const express = require('express')
const app = express()
const Joi = require('joi')

app.use(express.json()) // middleware touching req.body

const genres = [
  {id: 1, name: 'Horror'},
  {id: 2, name: 'Comedy'},
  {id: 3, name: 'Documentary'},
]

app.get('/', (req,res) => {
  res.send('Welcome to Vidly')
})

app.get('/api/genres', (req,res) => {
  res.send(genres)
})

app.get('/api/genres/:id', (req,res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('No genre with that ID')
  
  res.send(genre)
})

app.post('/api/genres/', (req,res) => {
  const {error} = validateRequest(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  } 
  genres.push(newGenre)
  res.send(newGenre)
})

app.put('/api/genres/:id', (req,res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('No genre with that ID')
  
  const {error} = validateRequest(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  genre.name = req.body.name
  res.send(genre)
})

app.delete('/api/genres/:id', (req,res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('No genre with that ID')
    
  const index = genres.indexOf(genre)
  genres.splice(index, 1)

  res.send(genre)
})

const validateRequest = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  })
  return schema.validate(genre);
}


const port = process.env.PORT || 8000
app.listen(port, () => console.log('Listening on port: ' + port))