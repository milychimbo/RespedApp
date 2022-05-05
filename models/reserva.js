const {
    Sequelize,
    DataTypes
} = require('sequelize');

const path = 'mysql://root:root@localhost:3306/bdd_respedapp';

const connection = new Sequelize(path);

const Reserva = connection.define('reserva', {
    idReserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    reservationDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reservationTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    people: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPedido: {
        type: DataTypes.INTEGER
    },
    note: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'reserva',
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

async function getOneReserva(idReserva) {
    try {
        return await Reserva.findByPk(idReserva)
    } catch(err){
        return err;}
}

async function createReserva(reserva) {
    try {
        return await Reserva.create({
            reservationDate: reserva.reservationDate,
            reservationTime: reserva.reservationTime,
            people: reserva.people,
            idPedido: reserva.idPedido,
            note: reserva.note
        });
    } catch(err){
        return err;}
}

async function updateReserva(reserva) {
    try {
        return await Reserva.update({
            reservationDate: reserva.reservationDate,
            reservationTime: reserva.reservationTime,
            people: reserva.people,
            idPedido: reserva.idPedido,
            note: reserva.note
        }, {
            where: {
                idReserva: reserva.idReserva
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

/*
const {getAllReservas, getOneReserva, createReserva, updateReserva,deleteReserva} = require('./models/reserva');

getAllReservas().then(reserva => {
    console.log(reserva[0].toJSON())
  })
  .catch(err => {
    console.log(err)
  })


getOneReserva(1).then(reserva => {
    console.log(reserva.toJSON())
  })
  .catch(err => {
    console.log(err)
  })

var reserva = {
    reservationDate: "2022/03/05", //aaaa-mm-dd o aaaa/mm/dd
    reservationTime: "10:30",
    people: 2,
    idPedido: null,
    note: null
}
createReserva(reserva)
  .catch(err => {
    console.log(err)
  })

var reserva = {
    idReserva: 2,
    reservationDate: "2022/03/05", //aaaa-mm-dd o aaaa/mm/dd
    reservationTime: "10:30",
    people: 2,
    idPedido: null,
    note: null
}

updateReserva(reserva)

deleteReserva(2)

*/