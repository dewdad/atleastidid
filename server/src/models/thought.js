const Sequelize = require('sequelize')

module.exports = (sequelizeInstance) => {
  let Thoughts = sequelizeInstance.define('Thoughts', {
    slug: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      set: function (val) {
        this.setDataValue(
          'slug',
          val.toLowerCase()
        )
      }
    },
    title: {
      unique: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    }
  })

  Thoughts.associate = function(models) {
    Thoughts.belongsTo(models.User)
  }

  return Thoughts
}