const Sequelize = require('sequelize')

module.exports = (sequelizeInstance) => {
  let Task = sequelizeInstance.define('Tasks', {
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
    completed: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    author: {
      type: Sequelize.STRING
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true
    }
  })

  Task.associate = function(models) {
    Task.belongsTo(models.User)
  }

  return Task
}