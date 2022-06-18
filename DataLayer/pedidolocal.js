const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const PedidoLocal = connection.define('PEDIDOLOCAL', {
    IDPEDIDO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    IDUSUARIO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'USUARIO',
            key: 'IDUSUARIO'
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
    MESA: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'PEDIDOLOCAL',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllPedidosLocales() {
    try {
        return await PedidoLocal.findAll({
            raw: true
           });
    }  catch(err){
        return err;
    }
}

async function getPedidosPorUsuario(usuario) {
    try {
        return await PedidoLocal.findAll({
            where: {IDUSUARIO : usuario}
           });
    } catch(err){
        return err;
    }
}
async function getOnePedidoLocal(IDPEDIDO) {
    try {
        return await PedidoLocal.findByPk(IDPEDIDO)
    }  catch(err){
        return err;
    }
}

async function createPedidoLocal(pedido) {
    try {
        return await PedidoLocal.create({
            IDUSUARIO: pedido.IDUSUARIO,
            IDPEDIDOTOTAL: pedido.IDPEDIDOTOTAL,
            MESA: pedido.MESA
        });
    }  catch(err){
        return err;
    }
}

module.exports = {
    getAllPedidosLocales,
    getOnePedidoLocal,
    getPedidosPorUsuario,
    createPedidoLocal
}
