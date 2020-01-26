module.exports = {
  health (req, res) {
    return res.status(200).send({
      message: 'It\'s alive Mr.Hernandez... It\'s alive.'
    })
  }
}