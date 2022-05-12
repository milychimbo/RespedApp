const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const Pedido = connection.define('pedido', {
    idPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    products: {
        type: DataTypes.JSON,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    type: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    idAddress: {
        type: DataTypes.INTEGER
    },
    note: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: false
    },idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'pedido',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllPedidos() {
    try {
        return await Pedido.findAll({
            raw: true
           });
    }  catch(err){
        return err;
    }
}

async function getOnePedido(idPedido) {
    try {
        return await Pedido.findByPk(idPedido)
    }  catch(err){
        return err;
    }
}

async function createPedido(pedido) {
    try {
        return await Pedido.create({
            products: pedido.products,
            totalPrice: pedido.totalPrice,
            type: pedido.type,
            idAddress: pedido.idAddress,
            note: pedido.note,
            state: pedido.state,
            idUsuario: pedido.idUsuario
        });
    }  catch(err){
        return err;
    }
}

async function updatePedido(pedido) {
    try {
        return await Pedido.update({
            products: pedido.products,
            totalPrice: pedido.totalPrice,
            type: pedido.type,
            idAddress: pedido.idAddress,
            note: pedido.note,
            state: pedido.state,
            idUsuario: pedido.idUsuario
        }, {
            where: {
                idPedido: pedido.idPedido,
            }
        })
    }  catch(err){
        return err;
    }
}

async function deletePedido(idPedido) {
    try {
        return await Pedido.destroy({
            where: {
                idPedido: idPedido
            }
        })
    }  catch(err){
        return err;
    }
}

module.exports = {
    getAllPedidos,
    getOnePedido,
    createPedido,
    updatePedido,
    deletePedido
}

/*
const {getAllPedidos, getOnePedido, createPedido, updatePedido,deletePedido} = require('./models/pedido');

getAllPedidos().then(pedido => {
    console.log(pedido[0].toJSON())
  })
  .catch(err => {
    console.log(err)
  })


getOnePedido(1).then(pedido => {
    console.log(pedido.toJSON())
  })
  .catch(err => {
    console.log(err)
  })

var pedido = {
    products: [{}],
    totalPrice: 31.50,
    type: 1,
    idAddress: null,
    note: null,
    state: 1

}
createPedido(pedido)
  .catch(err => {
    console.log(err)
  })

var pedido = {
    idPedido: 2,
    products: [{}],
    totalPrice: 31.50,
    type: 1,
    idAddress: null,
    note: null,
    state: 1
}

updatePedido(pedido)

deletePedido(2)

*/