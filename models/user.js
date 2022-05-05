const {
  Sequelize,
  DataTypes
} = require('sequelize');

const path = 'mysql://root:root@localhost:3306/bdd_respedapp';

const connection = new Sequelize(path);

const User = connection.define('usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoUsuario: {
    type: DataTypes.TINYINT,
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

async function getOneUser(idUsuario) {
  try {
    return await User.findByPk(idUsuario)
  } catch(err){
    return err;
  }
}

async function createUser(user) {
  try {
    return await User.create({
      userName: user.userName,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      password: user.password,
      tipoUsuario: user.tipoUsuario
    });
  } catch(err){
    return err;
  }
}

async function updateUser(user) {
  try {
    return await User.update({
      userName: user.userName,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      password: user.password,
      tipoUsuario: user.tipoUsuario
    }, {
      where: {
        idUsuario: user.idUsuario
      }
    })
  } catch(err){
    return err;
  }
}

async function deleteUser(idUsuario) {
  try {
    return await User.destroy({
      where: {
        idUsuario: idUsuario
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

