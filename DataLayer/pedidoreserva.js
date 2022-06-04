const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const PedidoReserva = connection.define('PEDIDORESERVA', {
    IDPEDIDO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    IDRESERVA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'RESERVA',
            key: 'IDRESERVA'
        }
    },
    IDPEDIDOTOTAL: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PEDIDOTOTAL',
            key: 'IDPEDIDOTOTAL'
        }
    },
}, {
    tableName: 'PEDIDORESERVA',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllPedidosReserva() {
    try {
        return await PedidoReserva.findAll({
            raw: true
           });
    }  catch(err){
        return err;
    }
}

async function getOnePedidoReserva(IDPEDIDO) {
    try {
        return await PedidoReserva.findByPk(IDPEDIDO)
    }  catch(err){
        return err;
    }
}

async function createPedidoReserva(pedido) {
    try {
        return await Pedido.create({
            IDRESERVA: pedido.IDRESERVA,
            IDPEDIDOTOTAL: pedido.IDPEDIDOTOTAL
        });
    }  catch(err){
        return err;
    }
}


module.exports = {
    getAllPedidosReserva,
    getOnePedidoReserva,
    createPedidoReserva
}
