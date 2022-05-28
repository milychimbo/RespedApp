const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const Pedido = connection.define('pedido', {
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
            model: 'tipopedido',
            key: 'IDTIPOPEDIDO'
        }
    },
    IDDIRECCION: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'direccion',
            key: 'IDDIRECCION'
        }
    },
    IDUSUARIO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
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
    STATE: {
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
            STATE: pedido.STATE
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
            STATE: pedido.STATE
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
