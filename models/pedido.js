const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const Pedido = connection.define('PEDIDO', {
    IDPEDIDO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    IDTIPOPEDIDO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TIPOPEDIDO',
            key: 'IDTIPOPEDIDO'
        }
    },
    IDDIRECCION: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'DIRECCION',
            key: 'IDDIRECCION'
        }
    },
    IDUSUARIO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'USUARIO',
            key: 'IDUSUARIO'
        }
    },
    TOTALPRICE: {
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
    tableName: 'PEDIDO',
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

async function getOnePedido(IDPEDIDO) {
    try {
        return await Pedido.findByPk(IDPEDIDO)
    }  catch(err){
        return err;
    }
}

async function createPedido(pedido) {
    try {
        return await Pedido.create({
            IDTIPOPEDIDO: pedido.IDTIPOPEDIDO,
            IDDIRECCION: pedido.IDDIRECCION,
            IDUSUARIO: pedido.IDUSUARIO,
            TOTALPRICE: pedido.TOTALPRICE,
            NOTE: pedido.NOTE,
            IDSTATE: pedido.IDSTATE
        });
    }  catch(err){
        return err;
    }
}

async function updatePedido(pedido) {
    try {
        return await Pedido.update({
            IDTIPOPEDIDO: pedido.IDTIPOPEDIDO,
            IDDIRECCION: pedido.IDDIRECCION,
            IDUSUARIO: pedido.IDUSUARIO,
            TOTALPRICE: pedido.TOTALPRICE,
            NOTE: pedido.NOTE,
            IDSTATE: pedido.IDSTATE
        }, {
            where: {
                IDPEDIDO: pedido.IDPEDIDO
            }
        })
    }  catch(err){
        return err;
    }
}

async function deletePedido(IDPEDIDO) {
    try {
        return await Pedido.destroy({
            where: {
                IDPEDIDO: IDPEDIDO
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
