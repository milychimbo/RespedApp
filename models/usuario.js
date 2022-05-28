const {
  Sequelize,
  DataTypes
} = require('sequelize');

const { path } = require('./connection');

const connection = new Sequelize(path);

const User = connection.define('usuario', {
  IDUSUARIO: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  IDTIPOUSUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
        references: {
            model: 'tipousuario',
            key: 'IDTIPOUSUARIO'
        }
},
  USERNAME: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  EMAIL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  NAME: {
    type: DataTypes.STRING
  },
  LASTNAME: {
    type: DataTypes.STRING
  },
  PASSWORD: {
    type: DataTypes.STRING,
    allowNull: false
  },
  PHONE: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'usuario',
  timestamps: false
})

//User.sync().then(() => {})

async function getAllUsers() {
  try {
    return await User.findAll({
      raw: true
     });
  } catch(err){
    return err;
  }
}

async function getOneUser(IDUSUARIO) {
  try {
    return await User.findByPk(IDUSUARIO)
  } catch(err){
    return err;
  }
}

async function createUser(user) {
  try {
    return await User.create({
      IDTIPOUSUARIO: user.IDTIPOUSUARIO,
      USERNAME: user.USERNAME,
      EMAIL: user.EMAIL,
      NAME: user.NAME,
      LASTNAME: user.LASTNAME,
      PASSWORD: user.PASSWORD,
      PHONE: user.PHONE
    });
  } catch(err){
    return err;
  }
}

async function updateUser(user) {
  try {
    return await User.update({
      IDTIPOUSUARIO: user.IDTIPOUSUARIO,
      USERNAME: user.USERNAME,
      EMAIL: user.EMAIL,
      NAME: user.NAME,
      LASTNAME: user.LASTNAME,
      PASSWORD: user.PASSWORD,
      PHONE: user.PHONE
    }, {
      where: {
        IDUSUARIO: user.IDUSUARIO
      }
    })
  } catch(err){
    return err;
  }
}

async function deleteUser(IDUSUARIO) {
  try {
    return await User.destroy({
      where: {
        IDUSUARIO: IDUSUARIO
      }
    })
  } catch(err){
    return err;
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}

