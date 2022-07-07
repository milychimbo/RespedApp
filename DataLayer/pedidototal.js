const {
    Sequelize,
    DataTypes
} = require('sequelize');

const {
    path
} = require('./connection');

const connection = new Sequelize(path);

const PedidoTotal = connection.define('PEDIDOTOTAL', {
    IDPEDIDOTOTAL: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    NUMPEDIDO: {
        type: DataTypes.STRING,
        allowNull: false
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
    },
    PAGADO: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    TIPO: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'PEDIDOTOTAL',
    timestamps: false
})


async function getAllPedidos() {
    try {
        return await PedidoTotal.findAll({
            raw: true
        });
    } catch (err) {
        return err;
    }
}

async function getOnePedido(IDPEDIDOTOTAL) {
    try {
        return await PedidoTotal.findByPk(IDPEDIDOTOTAL)
    } catch (err) {
        return err;
    }
}

async function createPedido(pedido) {
    try {
        return await PedidoTotal.create({
            NUMPEDIDO: pedido.NUMPEDIDO,
            VALORTOTAL: pedido.VALORTOTAL,
            NOTE: pedido.NOTE,
            IDSTATE: pedido.IDSTATE,
            PAGADO: pedido.PAGADO,
            TIPO: pedido.TIPO
        });
    } catch (err) {
        return err;
    }
}

async function updatePedido(pedido) {
    try {
        return await PedidoTotal.update({
            NOTE: pedido.NOTE,
            IDSTATE: pedido.IDSTATE,
            PAGADO: pedido.PAGADO,
            TIPO: pedido.TIPO
        }, {
            where: {
                IDPEDIDOTOTAL: pedido.IDPEDIDOTOTAL
            }
        })
    } catch (err) {
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
    } catch (err) {
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