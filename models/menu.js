const {
    Sequelize,
    DataTypes
} = require('sequelize');

const path = 'mysql://root:root@localhost:3306/bdd_respedapp';

const connection = new Sequelize(path);

const Menu = connection.define('menu', {
    idMenu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    menu: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'menu',
    timestamps: false
})

//User.sync().then(() => {})

async function getMenu() {
    try {
        return await Menu.findAll();
    } catch {}
}


async function updateMenu(menu) {
    try {
        return await Menu.update({
            menu: menu.menu
        }, {
            where: {
                idMenu: menu.idMenu
            }
        })
    } catch {}
}

module.exports = {
    getMenu,
    updateMenu
}

/*
const {getAllDirecciones, getOneDireccion, createDireccion, updateDireccion,deleteDireccion} = require('./models/direccion');

getAllDirecciones().then(direccion => {
    console.log(direccion[0].toJSON())
  })
  .catch(err => {
    console.log(err)
  })


getOneDireccion(1).then(direccion => {
    console.log(direccion.toJSON())
  })
  .catch(err => {
    console.log(err)
  })

var direccion = {
    street1: "Calle 1",
    street2: "Calle 2",
    reference: null
}
createDireccion(direccion)
  .catch(err => {
    console.log(err)
  })

var direccion = {
    idReserva: 2,
    street1: "Calle 1",
    street2: "Calle 2",
    reference: null
}

updateDireccion(direccion)

deleteDireccion(2)

*/