const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const RelacionPedidoProducto = connection.define('RELACIONPEDIDOPRODUCTO', {
    IDPEDIDO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'PEDIDO',
            key: 'IDPEDIDO'
        }
    },
    IDPRODUCTO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'PRODUCTO',
            key: 'IDPRODUCTO'
        }
    },
    PRICE: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    tableName: 'RELACIONPEDIDOPRODUCTO',
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
        return await RelacionPedidoProducto.findByPk(1,4)
    }  catch(err){
        return err;
    }
}

async function createPedidoProducto(relacion) {
    try {
        return await RelacionPedidoProducto.create({
            IDPEDIDO: relacion.IDPEDIDO,
            IDPRODUCTO: relacion.IDPRODUCTO,
            PRICE: relacion.PRICE
        });
    }  catch(err){
        return err;
    }
}


module.exports = {
    getAllRelacionPedidoProducto,
    getPedidoProducto,
    createPedidoProducto
}
