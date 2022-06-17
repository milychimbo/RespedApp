const {
    Sequelize,
    DataTypes
} = require('sequelize');

const {
    path
} = require('./connection');

const connection = new Sequelize(path);

const Estado2 = connection.define('ESTADO2', {
    IDSTATE: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    STATE: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'ESTADO2',
    timestamps: false
})



async function getOneEstado(IDSTATE) {
    try {
        return await Estado.findByPk(IDSTATE)
    } catch (err) {
        return err;
    }
}


module.exports = {
    
    getOneEstado
}