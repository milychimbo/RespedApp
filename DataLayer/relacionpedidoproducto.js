const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const RelacionPedidoProducto = connection.define('RELACIONPEDIDOPRODUCTO', {
    IDRELACIONPP: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    IDPEDIDOTOTAL: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PEDIDOTOTAL',
            key: 'IDPEDIDOTOTAL'
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


async function getPedidoProducto(IDPEDIDOTOTALX) {
    try {
        return await RelacionPedidoProducto.findAll({
            where: { IDPEDIDOTOTAL: IDPEDIDOTOTALX }})
    }  catch(err){
        return err;
    }
}

async function createPedidoProducto(relacion) {
    try {
        return await RelacionPedidoProducto.create({
            IDPEDIDOTOTAL: relacion.IDPEDIDOTOTAL,
            IDPRODUCTO: relacion.IDPRODUCTO,
            PRICE: relacion.PRICE
        });
    }  catch(err){
        return err;
    }
}

async function deletePedidoProducto(IDRELACIONPPX) {
    try {
        return await RelacionPedidoProducto.destroy({
            where: {
                IDRELACIONPP: IDRELACIONPPX
            }
        })
    } catch(err){
        return err;
      }
}

module.exports = {
    getPedidoProducto,
    createPedidoProducto,
    deletePedidoProducto
}
