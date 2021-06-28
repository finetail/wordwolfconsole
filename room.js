module.exports = class Room {
  person_word
  wolf_word
  persons
  wolves
  votes
  constructor(id, name, master_id) {
    this.id = id
    this.name = name
    this.master_id = master_id
    this.persons = []
    this.wolves = []
    this.number_of_wolves = 1
  }

  addPerson(person) {
    this.persons.push(person)
  }
  addWolf(wolf) {
    this.wolves.push(wolf)
  }
  setNumberOfWolves(number_of_wolves) {
    this.number_of_wolves = number_of_wolves
  }
  setPersonWord(word) {
    this.person_word = word
  }
  setWolfWord(word) {
    this.wolf_word = word
  }
  resetWolves() {
    this.wolves = []
  }
  vote(vote) {
    if (this.votes.hasOwnProperty(vote)) {
      this.votes[vote] += 1
    } else {
      this.votes[vote] = 1
    }
  }
  resetVotes() {
    this.votes = {}
  }

}