const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())

require('dotenv').config()

let editMessage = ''
let message = ''
let isShuffled = false

const Game = require('./models/game')

const treatedArray = (arr) => {
  const newArr = arr.slice()
  if (isShuffled) {
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1))
      ;[newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
    }
  }
  return newArr
}

const findAll = async () => {
  const games = await Game.findAll()
  return games
}

const findGameById = async (id) => {
  const game = await Game.findByPk(id)
  return game
}

app.get('/', async (req, res) => {
  const games = await findAll()

  res.render('pages/index', { games: treatedArray(games), message })

  setTimeout(() => {
    isShuffled = false
    message = ''
  }, 1000)
})

app.post('/shuffle', (req, res) => {
  isShuffled = true
  res.redirect('/')
})

app.get('/edit/:game_id', (req, res) => {
  const game = findGameById(req.params.game_id)

  res.render('pages/edit', { game, editMessage })

  setTimeout(() => {
    editMessage = ''
  }, 1000)
})

app.put('/edit/:game_id', (req, res) => {
  try {
    const game = findGameById(req.params.game_id)

    game.name = req.body.name
    game.image_url = req.body.image_url

    editMessage = 'Game edited succesfully!'
    res.redirect('/edit')
  } catch (err) {
    console.log(err)
  }
})

app.get('/details/:game_id', async (req, res) => {
  const game = await Game.findByPk(req.params.game_id)

  res.render('pages/details', { game })
})

app.post('/delete/:game_id', async (req, res) => {
  const game = await Game.findByPk(req.params.game_id)

  if (!game) {
    res.render('/', {
      mensagem: 'Game not found!',
    })
  }

  await game.destroy()

  message = `Game ${game.nome} deleted succesfully!`
  res.redirect('/')
})

app.get('/create', (req, res) => {
  res.render('pages/create')
})

app.post('/create', (req, res) => {
  const { name, image_url } = req.body

  const newGame = {
    name,
    image_url,
  }

  games.push(newGame)
  message = 'Game created succesfully!'
  res.redirect('/')
})

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`),
)
