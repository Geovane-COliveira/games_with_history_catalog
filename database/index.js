const Sequelize = require('sequelize')

// const sequelize = new Sequelize(
//   process.env.DB_BASE,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres',
//     protocol: '',
//   },
// )

const sequelize = new Sequelize(
  process.env.DB_HEROKU_BASE,
  process.env.DB_HEROKU_USER,
  process.env.DB_HEROKU_PASS,
  {
    host: process.env.DB_HEROKU_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
)

module.exports = sequelize
