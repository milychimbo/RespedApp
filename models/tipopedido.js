const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const TipoPedido = connection.define('tipopedido', {
    IDTIPOPEDIDO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    TIPO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EXTRA: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    tableName: 'tipopedido',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllTipoPedidos() {
    try {
        return await TipoPedido.findAll({
            raw: true
           });
    } catch(err){
        return err;
      }
}

async function getOneTipoPedido(IDTIPOPEDIDO) {
    try {
        return await TipoPedido.findByPk(IDTIPOPEDIDO)
    } catch(err){
        return err;
      }
}

async function createTipoPedido(tipopedido) {
    try {
        return await TipoPedido.create({
            TIPO: tipopedido.TIPO,
            EXTRA: tipopedido.EXTRA

        });
    } catch(err){
        return err;
      }
}

async function updateTipoPedido(tipopedido) {
    try {
        return await TipoPedido.update({
            TIPO: tipopedido.TIPO,
            EXTRA: tipopedido.EXTRA
        }, {
            where: {
                IDTIPOPEDIDO: tipopedido.IDTIPOPEDIDO
            }
        })
    } catch(err){
        return err;
      }
}

async function deleteTipoPedido(IDTIPOPEDIDO) {
    try {
        return await TipoPedido.destroy({
            where: {
                IDTIPOPEDIDO: IDTIPOPEDIDO
            }
        })
    } catch(err){
        return err;
      }
}

module.exports = {
    getAllTipoPedidos,
    getOneTipoPedido,
    createTipoPedido,
    updateTipoPedido,
    deleteTipoPedido
}
