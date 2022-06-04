const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const PedidoDomicilio = connection.define('PEDIDODOMICILIO', {
    IDPEDIDO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    IDRELACIONUD: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'RELACIONUSUARIODIRECCION',
            key: 'IDRELACIONUD'
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
    ENVIO: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    tableName: 'PEDIDODOMICILIO',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllPedidosDomicilio() {
    try {
        return await PedidoDomicilio.findAll({
            raw: true
           });
    }  catch(err){
        return err;
    }
}

async function getOnePedidoDomicilio(IDPEDIDO) {
    try {
        return await PedidoDomicilio.findByPk(IDPEDIDO)
    }  catch(err){
        return err;
    }
}

async function createPedidoDomicilio(pedido) {
    try {
        return await PedidoDomicilio.create({
            IDRELACIONUD: pedido.IDRELACIONUD,
            IDPEDIDOTOTAL: pedido.IDPEDIDOTOTAL,
            ENVIO: pedido.ENVIO
        });
    }  catch(err){
        return err;
    }
}

module.exports = {
    getAllPedidosDomicilio,
    getOnePedidoDomicilio,
    createPedidoDomicilio
}
