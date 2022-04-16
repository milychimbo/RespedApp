const {
    Sequelize,
    DataTypes
} = require('sequelize');

const path = 'mysql://root:root@localhost:3306/bdd_respedapp';

const connection = new Sequelize(path);

const Categoria = connection.define('categoria', {
    idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categoria',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllCategoria() {
    try {
        return await Categoria.findAll();
    } catch {}
}

async function getOneCategoria(idCategoria) {
    try {
        return await Categoria.findByPk(idCategoria)
    } catch {}
}

async function createCategoria(categoria) {
    try {
        return await Reserva.create({
            name: categoria.name
        });
    } catch {}
}

async function updateCategoria(categoria) {
    try {
        return await Categoria.update({
            name: categoria.name
        }, {
            where: {
                idCategoria: categoria.idCategoria
            }
        })
    } catch {}
}

async function deleteCategoria(idCategoria) {
    try {
        return await Categoria.destroy({
            where: {
                idCategoria: idCategoria
            }
        })
    } catch {}
}

module.exports = {
    getAllCategorias,
    getOneCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria
}

/*
const {getAllCategorias, getOneCategoria, createCategoria, updateCategoria,deleteCategoria} = require('./models/categoria');

getAllCategorias().then(categoria => {
    console.log(categoria[0].toJSON())
  })
  .catch(err => {
    console.log(err)
  })


getOneCategoria(1).then(categoria => {
    console.log(categoria.toJSON())
  })
  .catch(err => {
    console.log(err)
  })

var categoria = {
    name: "Refrescos"
}
createReserva(categoria)
  .catch(err => {
    console.log(err)
  })

var categoria = {
    idCategoria: 2,
    name: "Refrescos"
}

updateCategoria(categoria)

deleteCategoria(2)

*/