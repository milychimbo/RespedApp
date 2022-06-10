const {
    Sequelize,
    DataTypes
} = require('sequelize');
const { path } = require('./connection');


//const path = 'mysql://root:root@localhost:3306/bdd_respedapp';
const connection = new Sequelize(path);

const Direccion = connection.define('DIRECCION', {
    IDDIRECCION: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    STREET1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    STREET2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    REFERENCE: {
        type: DataTypes.STRING
    },
    NAME: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PHONEDIR: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'DIRECCION',
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

async function getOneDireccion(IDDIRECCION) {
    try {
        return await Direccion.findByPk(IDDIRECCION)
    }  catch(err){
        return err;
    }
}

async function createDireccion(direccion) {
    try {
        return await Direccion.create({
            STREET1: direccion.STREET1,
            STREET2: direccion.STREET2,
            REFERENCE: direccion.REFERENCE,
            NAME: direccion.NAME,
            PHONEDIR: direccion.PHONEDIR
        });
    }  catch(err){
        return err;
    }
}

async function updateDireccion(direccion) {
    try {
        return await Direccion.update({
            STREET1: direccion.STREET1,
            STREET2: direccion.STREET2,
            REFERENCE: direccion.REFERENCE,
            NAME: direccion.NAME,
            PHONEDIR: direccion.PHONEDIR
        }, {
            where: {
                IDDIRECCION: direccion.IDDIRECCION
            }
        })
    }  catch(err){
        return err;
    }
}

async function deleteDireccion(IDDIRECCION) {
    try {
        return await Direccion.destroy({
            where: {
                IDDIRECCION: IDDIRECCION
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
