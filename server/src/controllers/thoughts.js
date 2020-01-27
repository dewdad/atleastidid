const models = require('../models')
const Thought = models.Thought
const User = models.User

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

module.exports = {
  async create(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.payload.id }
      })
      console.log(user, req.payload)
      if (user) {
        var userId = user.id
        let thought = await Thought.create({
          slug: slugify(req.body.title),
          title: req.body.title,  
          description: req.body.description,
          body: req.body.body,
          author: user.email,
          UserId: userId
        })
        res.status(200).send({ thought })
      } else {
        res.status(404).send({
          message: `User was not found.`
        })
      }
    } catch (err) {
      console.error(err)
      res.status(500).send({
        error: err,
        message: 'Error creating new thought.'
      })
    }
  },
  async index(req, res) {
    try {
      let thoughts = await Thought.findAll({
        where: { UserId: req.payload.id }
      })
      return res.status(200).send({
        thoughts
      })
    } catch(err) {
      res.status(500).send({
        error: err,
        message: 'Error fetching all thoughts.'
      })
    }
  }
}