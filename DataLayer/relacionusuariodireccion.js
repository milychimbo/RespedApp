const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const RelacionUsuarioDireccion = connection.define('RELACIONUSUARIODIRECCION', {
    IDRELACIONUD: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
    IDDIRECCION: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'DIRECCION',
            key: 'IDDIRECCION'
        }
    },
    DEFAULTDIR: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'RELACIONUSUARIODIRECCION',
    timestamps: false
})

//User.sync().then(() => {})

async function getUsuarioDireccion(IDUSUARIOX) {
    try {
        return await RelacionUsuarioDireccion.findAll({
            where: { IDUSUARIO: IDUSUARIOX }})
    }  catch(err){
        return err;
    }
}

async function createUsuarioDireccion(relacion) {
    try {
        return await RelacionUsuarioDireccion.create({
            IDUSUARIO: relacion.IDUSUARIO,
            IDDIRECCION: relacion.IDDIRECCION,
            DEFAULTDIR: relacion.DEFAULTDIR
        });
    }  catch(err){
        return err;
    }
}


async function updateUsuarioDireccion(relacion) {
    try {
        return await RelacionUsuarioDireccion.update({
            IDUSUARIO: relacion.IDUSUARIO,
            IDDIRECCION: relacion.IDDIRECCION,
            DEFAULTDIR: relacion.DEFAULTDIR
        }, {
            where: {
                IDRELACIONUD: relacion.IDRELACIONUD
            }
        })
    }  catch(err){
        return err;
    }
}

module.exports = {
    getUsuarioDireccion,
    createUsuarioDireccion,
    updateUsuarioDireccion
}
