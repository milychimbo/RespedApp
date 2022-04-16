const {
  Sequelize,
  DataTypes
} = require('sequelize');

const path = 'mysql://root:root@localhost:3306/bdd_respedapp';

const connection = new Sequelize(path);

const Restaurant = connection.define('restaurante', {
  idRestaurante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  aforoMax: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  tableName: 'restaurante',
  timestamps: false
})


async function getOneRestaurant(idRestaurante) {
  try {
    return await Restaurant.findByPk(idRestaurante)
  } catch {}
}

async function updateRestaurante(restaurant) {
  try {
    return await Restaurant.update({
      aforoMax: restaurant.aforoMax
    }, {
      where: {
        idRestaurante: restaurant.idRestaurante
      }
    })
  } catch {}
}

module.exports = {
  getOneRestaurant,
  updateRestaurante
}

/*
const {getOneRestaurant, updateRestaurante} = require('./models/restaurante');

getOneRestaurant(1).then(restaurant => {
    console.log(restaurant.toJSON())
  })
  .catch(err => {
    console.log(err)
  })

var restaurant = {
    idUsuario: 1,
    aforoMax: 50
}

updateRestaurante(restaurant)

*/