const users = require('../models/UsersModel')

const logic = {
  train: function (req, res, next) {
    return {awesomeness: 2, hunger: (-2), fatigue: (-2), thirst: (-2)}
  },
  eat: function (req, res, next) {
    return {hunger: 20, thirst: (-1)}
  },
  drink: function (req, res, next) {
    return {thirst: 100}
  },
  sleep: function (req, res, next) {
    return {fatigue: 100, hunger: (-10), thirst: (-10)}
  },
  rest: function (req, res, next) {
    return {fatigue: 1}
  },
  training: function (req, res, next) {
    let id = req.params.id
    let modifier = logic.train()
    users.findOne({_id: id}, function (err, data) {
      data.hunger += modifier.hunger
      data.awesomeness += modifier.awesomeness
      data.fatigue += modifier.fatigue
      data.thirst += modifier.thirst
      data.save(function (err) {
        res.send(data)
      })
    })
  },
  eating: function (req, res, next) {
    let id = req.params.id
    let modifier = logic.eat()
    users.findOne({_id: id}, function (err, data) {
      data.hunger += modifier.hunger
      data.thirst += modifier.thirst
      if (data.hunger > 100) {
        data.hunger = 100
      }
      data.save(function (err) {
        res.send(data)
      })
    })
  },
  sleeping: function (req, res, next) {
    let id = req.params.id
    let modifier = logic.sleep()
    users.findOne({_id: id}, function (err, data) {
      data.fatigue = modifier.fatigue
      data.hunger += modifier.hunger
      data.thirst += modifier.thirst
      data.save(function (err) {
        res.send(data)
      })
    })
  },
  drinking: function (req, res, next) {
    let id = req.params.id
    let modifier = logic.drink()
    users.findOne({_id: id}, function (err, data) {
      data.thirst = modifier.thirst
      data.save(function (err) {
        res.send(data)
      })
    })
  }
}

module.exports = logic
