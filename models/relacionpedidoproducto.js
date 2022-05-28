const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const RelacionPedidoProducto = connection.define('relacionpedidoproducto', {
    IDPEDIDO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pedido',
            key: 'IDPEDIDO'
        }
    },
    IDPRODUCTO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'producto',
            key: 'IDPRODUCTO'
        }
    },
    PRICE: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    tableName: 'relacionpedidoproducto',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllRelacionPedidoProducto() {
    try {
        return await RelacionPedidoProducto.findAll({
            raw: true
           });
    }  catch(err){
        return err;
    }
}

async function getPedidoProducto(IDPEDIDO) {
    try {
        return await RelacionPedidoProducto.findByPk(IDPEDIDO)
    }  catch(err){
        return err;
    }
}

async function getProductoPedido(IDPRODUCTO) {
    try {
        return await RelacionPedidoProducto.findByPk(IDPRODUCTO)
    }  catch(err){
        return err;
    }
}

async function createPedidoProducto(relacionpedidoproducto) {
    try {
        return await RelacionPedidoProducto.create({
            IDPEDIDO: relacionpedidoproducto.IDPEDIDO,
            IDPRODUCTO: relacionpedidoproducto.IDPRODUCTO,
            PRICE: relacionpedidoproducto.PRICE
        });
    }  catch(err){
        return err;
    }
}

async function updatePedidoProducto(relacionpedidoproducto) {
    try {
        return await Reserva.update({
            IDPEDIDO: relacionpedidoproducto.IDPEDIDO,
            IDPRODUCTO: relacionpedidoproducto.IDPRODUCTO,
            PRICE: relacionpedidoproducto.PRICE
        }, {
            where: {
                IDPEDIDO: relacionpedidoproducto.IDPEDIDO,
                IDPRODUCTO: relacionpedidoproducto.IDPRODUCTO
            }
        })
    }  catch(err){
        return err;
    }
}

async function deletePedidoProducto(relacionpedidoproducto) {
    try {
        return await Producto.destroy({
            where: {
                IDPEDIDO: relacionpedidoproducto.IDPEDIDO,
                IDPRODUCTO: relacionpedidoproducto.IDPRODUCTO
            }
        })
    }  catch(err){
        return err;
    }
}

module.exports = {
    getAllRelacionPedidoProducto,
    getPedidoProducto,
    getProductoPedido,
    createPedidoProducto,
    updatePedidoProducto,
    deletePedidoProducto
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