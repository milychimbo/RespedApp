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
    IDUSUARIO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'USUARIO',
            key: 'IDUSUARIO'
        }
    },
    IDPEDIDO: {
        type: DataTypes.INTEGER,
        references: {
            model: 'PEDIDO',
            key: 'IDPEDIDO'
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

async function getOneReserva(IDRESERVA) {
    try {
        return await Reserva.findByPk(IDRESERVA)
    } catch(err){
        return err;}
}

async function createReserva(reserva) {
    try {
        return await Reserva.create({
            IDUSUARIO: reserva.IDUSUARIO,
            IDPEDIDO: reserva.IDPEDIDO,
            PEOPLE: reserva.PEOPLE,
            NOTE: reserva.NOTE,
            RESERVATIONDATE: reserva.RESERVATIONDATE,
            RESERVATIONTIME: reserva.RESERVATIONTIME
        });
    } catch(err){
        return err;}
}

async function updateReserva(reserva) {
    try {
        return await Reserva.update({
            IDUSUARIO: reserva.IDUSUARIO,
            IDPEDIDO: reserva.IDPEDIDO,
            PEOPLE: reserva.PEOPLE,
            NOTE: reserva.NOTE,
            RESERVATIONDATE: reserva.RESERVATIONDATE,
            RESERVATIONTIME: reserva.RESERVATIONTIME
        }, {
            where: {
                IDRESERVA: reserva.IDRESERVA
            }
        })
    } catch(err){
        return err;}
}

async function deleteReserva(idReserva) {
    try {
        return await Reserva.destroy({
            where: {
                idReserva: idReserva
            }
        })
    } catch(err){
        return err;}
}

module.exports = {
    getAllReservas,
    getOneReserva,
    createReserva,
    updateReserva,
    deleteReserva
}
