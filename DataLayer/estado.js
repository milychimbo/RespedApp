const {
    Sequelize,
    DataTypes
} = require('sequelize');

const {
    path
} = require('./connection');

const connection = new Sequelize(path);

const Estado = connection.define('ESTADO', {
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
    tableName: 'ESTADO',
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