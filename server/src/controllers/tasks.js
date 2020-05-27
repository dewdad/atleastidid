const models = require('../models')
const Task = models.Task
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
  async complete(req, res) {
    try {
      const task = await Task.findOne({
        where: { id: req.params.id }
      })
      if (task) {
        task.update(
          { completed: req.body.complete },
          { where: { id: req.params.id } }
        )
        let completed
        if (req.body.complete) {
          completed = true
        } else {
          completed = false
        }
        res.status(200).send({
          complete: completed,
          UserId: task.UserId,
          author: task.author,
          body: task.body,
          completed: task.completed,
          createdAt: task.createdAt,
          description: task.description,
          id: task.id,
          slug: task.slug,
          title: task.title,
          updatedAt: task.updatedAt,
          message: `Task ${req.params.id} was marked ${completed}.`,
          status: 200
        })
      } else {
        res.status(404).send({
          message: 'Error finding task by id.',
          status: 404
        })
      }
    } catch (err) {
      res.status(500).send({
        message: 'Error posting completion status to task:' + req.params.id,
        status: 500
      })
    }
  },
  async create(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.payload.id }
      })
      console.log('Created task:', req.session.userId)
      if (user) {
        var userId = user.id
        let task = await Task.create({
          slug: slugify(req.body.title),
          title: req.body.title,
          description: req.body.description,
          body: req.body.body,
          author: user.email,
          UserId: userId
        })
        res.status(200).send({ task })
        console.log(req.session)
      } else {
        res.status(404).send({
          message: `User was not found.`
        })
      }
    } catch (err) {
      console.error(err)
      res.status(500).send({
        error: err,
        message: 'Error creating new task.'
      })
    }
  },
  async index(req, res) {
    try {
      let tasks = await Task.findAll({
        where: { UserId: req.payload.id }
      })
      return res.status(200).send({
        tasks
      })
    } catch (err) {
      res.status(500).send({
        error: err,
        message: 'Error fetching all tasks.'
      })
    }
  },
  async delete(req, res) {
    try {
      // console.log('Delete: ', req.params)
      let task = await Task.destroy({
        where: {
          id: req.params.id
        }
      })

      // console.log('Task:', task)
      return res.status(200).send({
        message: 'Deleted task: ' + req.params.id
      })
    } catch (err) {
      res.status(500).send({
        error: err,
        message: 'Error deleting task: ' + req.params.id
      })
    }
  }
}