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

app.get('/', async (req, res) => {
  const games = await Game.findAll()

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
  const game = await Game.findByPk(req.params.game_id)

  res.render('pages/edit', { game, editMessage })

  setTimeout(() => {
    editMessage = ''
  }, 1000)
})

app.put('/edit/:game_id', (req, res) => {
  const game = await Game.findByPk(req.params.game_id)
    const {nome, descricao, imagem} = req.body;
    
  game.nome = nome; 
  game.descricao = descricao;
  game.imagem = imagem;

  const editedGame = await game.save();
    
    editMessage = 'Game edited succesfully!'
    res.render('pages/edit', { game: editedGame, editMessage })
 
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

app.post('/create', async (req, res) => {
  const { nome, imagem } = req.body

  await Game.create({
    nome,
    descricao: '',
    imagem,
  })

  message = 'Game created succesfully!'
  res.redirect('/')
})

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`),
)
