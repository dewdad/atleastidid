const Sequelize = require('sequelize')
const bcrypt = require('bcrypt-nodejs')

const hashPassword = (user, opts) => {
  const SALT_FACTOR = process.env.SALT_FACTOR || null
  if (!user.changed('password')) return
  const salt = bcrypt.genSaltSync(SALT_FACTOR)
  const hash = bcrypt.hashSync(user.password, salt)
  return user.setDataValue('password', hash)
}

module.exports = (sequelizeInstance) => {
  let Users = sequelizeInstance.define('Users', 
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        set: function(val) {
          this.setDataValue(
            'username',
            val.toLowerCase()
          )
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        set: function(val) {
          this.setDataValue(
            'email',
            val.toLowerCase()
          )
        } 
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    { 
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
      }
    }
  )

  Users.prototype.comparePassword = function(password) {
    console.log('Compare Password:', password, this.password)
    return bcrypt.compareSync(password, this.password)
  }

  return Users
}