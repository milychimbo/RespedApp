const {
    Sequelize,
    DataTypes
} = require('sequelize');

const path = 'mysql://root:root@localhost:3306/bdd_respedapp';

const connection = new Sequelize(path);

const Direccion = connection.define('direccion', {
    idDireccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    street1: {
        type: DataTypes.STRING
    },
    street2: {
        type: DataTypes.STRING
    },
    reference: {
        type: DataTypes.STRING
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'direccion',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllDirecciones() {
    try {
        return await Direccion.findAll({
            raw: true
           });
    }  catch(err){
        return err;
    }
}

async function getOneDireccion(idDireccion) {
    try {
        return await Direccion.findByPk(idDireccion)
    }  catch(err){
        return err;
    }
}

async function createDireccion(direccion) {
    try {
        return await Direccion.create({
            street1: direccion.street1,
            street2: direccion.street2,
            reference: direccion.reference,
            idUsuario: direccion.idUsuario
        });
    }  catch(err){
        return err;
    }
}

async function updateDireccion(direccion) {
    try {
        return await Direccion.update({
            street1: direccion.street1,
            street2: direccion.street2,
            reference: direccion.reference,
            idUsuario: direccion.idUsuario
        }, {
            where: {
                idDireccion: direccion.idDireccion
            }
        })
    }  catch(err){
        return err;
    }
}

async function deleteDireccion(idDireccion) {
    try {
        return await Direccion.destroy({
            where: {
                idDireccion: idDireccion
            }
        })
    }  catch(err){
        return err;
    }
}

module.exports = {
    getAllDirecciones,
    getOneDireccion,
    createDireccion,
    updateDireccion,
    deleteDireccion
}

/*
const {getAllDirecciones, getOneDireccion, createDireccion, updateDireccion,deleteDireccion} = require('./models/direccion');

getAllDirecciones().then(direccion => {
    console.log(direccion[0].toJSON())
  })
  .catch(err => {
    console.log(err)
  })


getOneDireccion(1).then(direccion => {
    console.log(direccion.toJSON())
  })
  .catch(err => {
    console.log(err)
  })

var direccion = {
    street1: "Calle 1",
    street2: "Calle 2",
    reference: null
}
createDireccion(direccion)
  .catch(err => {
    console.log(err)
  })

var direccion = {
    idReserva: 2,
    street1: "Calle 1",
    street2: "Calle 2",
    reference: null
}

updateDireccion(direccion)

deleteDireccion(2)

*/