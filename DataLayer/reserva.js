const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const Reserva = connection.define('RESERVA', {
    IDRESERVA: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    NUMRESERVA: {
        type: DataTypes.STRING,
        allowNull: false
    },
    IDUSUARIO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'USUARIO',
            key: 'IDUSUARIO'
        }
    },
    IDSTATE: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ESTADO',
            key: 'IDSTATE'
        }
    },
    PEOPLE: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    NOTE: {
        type: DataTypes.STRING
    },
    RESERVATIONDATE: {
        type: DataTypes.DATE,
        allowNull: false
    },
    RESERVATIONTIME: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'RESERVA',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllReservas() {
    try {
        return await Reserva.findAll({
            raw: true
           });
    } catch(err){
        return err;
    }
}
async function getReservasPorUsuario(usuario) {
    try {
        return await Reserva.findAll({
            where: {IDUSUARIO : usuario}
           });
    } catch(err){
        return err;
    }
}
async function getReservasPorEstado(estado) {
    try {
        return await Reserva.findAll({
            where: {IDSTATE : estado}
           });
    } catch(err){
        return err;
    }
}
async function getOneReserva(IDRESERVA) {
    try {
        return await Reserva.findByPk(IDRESERVA)
    } catch(err){
        return err;}
}

async function getUsuarioReserva(IDUSUARIOX) {
    try {
        return await Reserva.findAll({
            where: { IDUSUARIO: IDUSUARIOX }})
    }  catch(err){
        return err;
    }
}
async function createReserva(reserva) {
    try {
        return await Reserva.create({
            NUMRESERVA: reserva.NUMRESERVA,
            IDUSUARIO: reserva.IDUSUARIO,
            PEOPLE: reserva.PEOPLE,
            NOTE: reserva.NOTE,
            RESERVATIONDATE: reserva.RESERVATIONDATE,
            RESERVATIONTIME: reserva.RESERVATIONTIME,
            IDSTATE: reserva.IDSTATE
        });
    } catch(err){
        return err;}
}

async function updateReserva(reserva) {
    try {
        return await Reserva.update({
            IDSTATE: reserva.IDSTATE
        }, {
            where: {
                IDRESERVA: reserva.IDRESERVA
            }
        })
    } catch(err){
        return err;}
}

async function deleteReserva(IDRESERVA) {
    try {
        return await Reserva.destroy({
            where: {
                IDRESERVA: IDRESERVA
            }
        })
    } catch(err){
        return err;}
}

module.exports = {
    getAllReservas,
    getOneReserva,
    getReservasPorEstado,
    getReservasPorUsuario,
    getUsuarioReserva,
    createReserva,
    updateReserva,
    deleteReserva
}
