const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const TipoUsuario = connection.define('tipousuario', {
    IDTIPOUSUARIO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    TIPO: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tipousuario',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllTipoUsuarios() {
    try {
        return await TipoUsuario.findAll({
            raw: true
           });
    } catch(err){
        return err;
      }
}

async function getOneTipoUsuario(IDTIPOUSUARIO) {
    try {
        return await TipoUsuario.findByPk(IDTIPOUSUARIO)
    } catch(err){
        return err;
      }
}


async function updateTipoUsuario(tipousuario) {
    try {
        return await TipoUsuario.update({
            TIPO: tipousuario.TIPO
        }, {
            where: {
                IDTIPOUSUARIO: tipousuario.IDTIPOUSUARIO
            }
        })
    } catch(err){
        return err;
      }
}


module.exports = {
    getAllTipoUsuarios,
    getOneTipoUsuario,
    updateTipoUsuario
}
