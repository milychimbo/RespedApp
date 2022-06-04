const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const PedidoTotal = connection.define('PEDIDOTOTAL', {
    IDPEDIDOTOTAL: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    VALORTOTAL: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    NOTE: {
        type: DataTypes.STRING
    },
    IDSTATE: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ESTADO',
            key: 'IDSTATE'
        }
    }
}, {
    tableName: 'PEDIDOTOTAL',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllPedidos() {
    try {
        return await PedidoTotal.findAll({
            raw: true
           });
    }  catch(err){
        return err;
    }
}

async function getOnePedido(IDPEDIDOTOTAL) {
    try {
        return await PedidoTotal.findByPk(IDPEDIDOTOTAL)
    }  catch(err){
        return err;
    }
}

async function createPedido(pedido) {
    try {
        return await PedidoTotal.create({
            VALORTOTAL: pedido.VALORTOTAL,
            NOTE: pedido.NOTE,
            IDSTATE: pedido.IDSTATE
        });
    }  catch(err){
        return err;
    }
}

async function updatePedido(pedido) {
    try {
        return await PedidoTotal.update({
            VALORTOTAL: pedido.VALORTOTAL,
            NOTE: pedido.NOTE,
            IDSTATE: pedido.IDSTATE
        }, {
            where: {
                IDPEDIDOTOTAL: pedido.IDPEDIDOTOTAL
            }
        })
    }  catch(err){
        return err;
    }
}

async function deletePedido(IDPEDIDOTOTAL) {
    try {
        return await PedidoTotal.destroy({
            where: {
                IDPEDIDOTOTAL: IDPEDIDOTOTAL
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
