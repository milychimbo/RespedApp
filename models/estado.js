const {
    Sequelize,
    DataTypes
} = require('sequelize');

const {
    path
} = require('./connection');

const connection = new Sequelize(path);

const Estado = connection.define('estado', {
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
    tableName: 'estado',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllEstados() {
    try {
        return await Estado.findAll({
            raw: true
        });
    } catch (err) {
        return err;
    }
}

async function getOneEstado(IDSTATE) {
    try {
        return await Estado.findByPk(IDSTATE)
    } catch (err) {
        return err;
    }
}


module.exports = {
    getAllEstados,
    getOneEstado
}