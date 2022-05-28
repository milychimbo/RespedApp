const {
    Sequelize,
    DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const Categoria = connection.define('categoria', {
    IDCATEGORIA: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    NAME: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categoria',
    timestamps: false
})

//User.sync().then(() => {})

async function getAllCategorias() {
    try {
        return await Categoria.findAll({
            raw: true
           });
    } catch(err){
        return err;
      }
}

async function getOneCategoria(IDCATEGORIA) {
    try {
        return await Categoria.findByPk(IDCATEGORIA)
    } catch(err){
        return err;
      }
}

async function createCategoria(categoria) {
    try {
        return await Categoria.create({
            NAME: categoria.NAME
        });
    } catch(err){
        return err;
      }
}

async function updateCategoria(categoria) {
    try {
        return await Categoria.update({
            NAME: categoria.NAME
        }, {
            where: {
                IDCATEGORIA: categoria.IDCATEGORIA
            }
        })
    } catch(err){
        return err;
      }
}

async function deleteCategoria(IDCATEGORIA) {
    try {
        return await Categoria.destroy({
            where: {
                IDCATEGORIA: IDCATEGORIA
            }
        })
    } catch(err){
        return err;
      }
}

module.exports = {
    getAllCategorias,
    getOneCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria
}