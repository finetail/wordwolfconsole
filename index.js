const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
const Room = require('./room')
const Person = require('./person')

function getRoomByRequest(req) {
  const id = req.query.id
  const room = rooms[id]
  return room
}

const rooms = {}
app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    if (req.query.id && rooms[req.query.id]) {
      const room = rooms[req.query.id]
      const data = { id: room.id, room_name: room.name }
      data.master = req.query.master_id && req.query.master_id === room.master_id
      res.render('pages/room', data)
    } else {
      res.render('pages/index')
    }
  })
  .get('/create_room', (req, res) => {
    const id = Math.random().toString(32).substring(2)
    const name = req.query.room_name
    const master_id = Math.random().toString(32).substring(2)
    rooms[id] = new Room(id, name, master_id)
    console.log(`id = ${name} master_id = ${master_id}`)
    console.log(rooms)
    res.json({ id: id, master_id: master_id })
  })
  .get('/join', (req, res) => {
    const person_name = req.query.name
    const person_id = Math.random().toString(32).substring(2)
    const room = getRoomByRequest(req)
    room.addPerson(new Person(person_id, person_name))
    res.json({ person_id: person_id })
  })
  .get('/get_status', (req, res) => {
    const room = getRoomByRequest(req)
    const message = "参加者は、" + room.persons.map(person => `${person.name}さん`).join(',')
    res.json({ message: message })
  })
  .get('/get_my_word', (req, res) => {
    const person_id = req.query.person_id
    const room = getRoomByRequest(req)
    if (room.wolves.map(wolf=>wolf.id).includes(person_id)) {
      res.json({ message: `あなたのお題は${room.wolf_word}です。` })
    } else {
      res.json({ message: `あなたのお題は${room.person_word}です。` })
    }
  })
  .get('/send_question', (req, res) => {
    const room = getRoomByRequest(req)
    const person_word = req.query.person
    const wolf_word = req.query.wolf
    room.setPersonWord(person_word)
    room.setWolfWord(wolf_word)
    persons = room.persons
    room.resetWolves()
    for (let i = 0; i < room.number_of_wolves; i++) {
      wolf = persons[Math.floor(Math.random() * persons.length)]
      while(room.wolves.includes(wolf)){
        wolf = persons[Math.floor(Math.random() * persons.length)]
      }
      room.addWolf(wolf)
    }
    res.json({ message: `人狼は${room.wolves.map(wolf=>`${wolf.name}`).join('、')}さんです。` })
    console.log(`人狼は${room.wolves.map(wolf=>`${wolf.name}`).join('、')}さんです。` )
  })
  .get('/num_change', (req, res) => {
    const room = getRoomByRequest(req)
    const number_of_wolves = req.query.number
    room.setNumberOfWolves(parseInt(number_of_wolves))
    const message = "参加者は、" + room.persons.map(person => `${person.name}さん`).join('、') + `、人狼は${number_of_wolves}人です。`
    res.json({ message: message })
    console.log(message)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))