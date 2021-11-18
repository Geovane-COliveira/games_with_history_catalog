const Sequelize = require('sequelize')
const database = require('./../database')
//TODO --> Ao conectar ao banco remoto, alterar para a tabela games_with_history
const Game = database.define(
  'games',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricao: Sequelize.STRING,
    imagem: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
)
module.exports = Game