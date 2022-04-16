const {
    Sequelize,
    DataTypes
} = require('sequelize');

const path = 'mysql://root:root@localhost:3306/bdd_respedapp';

const connection = new Sequelize(path);

const Producto = connection.define('producto', {
    idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    availability: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'producto',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllProductos() {
    try {
        return await Producto.findAll();
    } catch {}
}

async function getOneProduct(idProducto) {
    try {
        return await Producto.findByPk(idProducto)
    } catch {}
}

async function createProducto(producto) {
    try {
        return await Producto.create({
            name: producto.name,
            detail: producto.detail,
            price: producto.price,
            availability: producto.availability,
            image: producto.image,
            idCategoria: producto.idCategoria
        });
    } catch {}
}

async function updateProducto(producto) {
    try {
        return await Reserva.update({
            name: producto.name,
            detail: producto.detail,
            price: producto.price,
            availability: producto.availability,
            image: producto.image,
            idCategoria: producto.idCategoria
        }, {
            where: {
                idProducto: producto.idProducto,
            }
        })
    } catch {}
}

async function deleteProducto(idProducto) {
    try {
        return await Producto.destroy({
            where: {
                idProducto: idProducto
            }
        })
    } catch {}
}

module.exports = {
    getAllProductos,
    getOneProducto,
    createProducto,
    updateProducto,
    deleteProducto
}

/*
const {getAllProductos, getOneProducto, createProducto, updateProducto,deleteProducto} = require('./models/producto');

getAllProductos().then(producto => {
    console.log(producto[0].toJSON())
  })
  .catch(err => {
    console.log(err)
  })


getOneProducto(1).then(producto => {
    console.log(producto.toJSON())
  })
  .catch(err => {
    console.log(err)
  })

var producto = {
    name: "Pepsi"
    detail: null,
    price: 2.50,
    availability: 1,
    image: null,
    idCategoria: 1

}
createProducto(reserva)
  .catch(err => {
    console.log(err)
  })

var producto = {
    idProducto: 2,
    name: "Pepsi"
    detail: null,
    price: 2.50,
    availability: 1,
    image: null,
    idCategoria: 1
}

updateProducto(producto)

deleteProducto(2)

*/