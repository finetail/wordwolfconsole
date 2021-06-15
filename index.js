const e = require('express')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

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
    rooms[id] = { id: id, name: name, master_id: master_id, persons: [] }
    console.log(`id = ${name} master_id = ${master_id}`)
    console.log(rooms)
    res.json({ id: id, master_id: master_id })
  })
  .get('/join', (req, res) => {
    const id = req.query.id
    const person_name = req.query.name
    const person_id = Math.random().toString(32).substring(2)
    room = rooms[id]
    room.persons.push({ id: person_id, name: person_name })
    res.json({ person_id: person_id })
  })
  .get('/get_status', (req, res) => {
    const id = req.query.id
    message = "参加者は、" + rooms[id].persons.map(person=>`${person.name}さん`).join(',')
    res.json({ message: message })
  })
  .get('/get_my_word',(req,res)=>{
    const id = req.query.id
    const person_id = req.query.person_id
    room = rooms[id]
    if(room.wolf_id === person_id){
      res.json({ message: `あなたのお題は${room.wolf_word}です。` })
    }else{
      res.json({ message: `あなたのお題は${room.person_word}です。` })
    }
  })
  .get('/send_question', (req, res) => {
    const id = req.query.id
    const person_word = req.query.person
    const wolf_word = req.query.wolf
    room = rooms[id]
    room.person_word = person_word
    room.wolf_word = wolf_word
    persons = room.persons
    wolf = persons[Math.floor(Math.random() * persons.length)]
    room.wolf_id = wolf.id
    res.json({message:`人狼は${wolf.name}さんです。`})
    console.log(`人狼は${wolf.name}さんです。`)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))