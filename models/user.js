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
    return await User.findAll();
  } catch {}
}

async function getOneUser(idUsuario) {
  try {
    return await User.findByPk(idUsuario)
  } catch {}
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
  } catch {}
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
  } catch {}
}

async function deleteUser(idUsuario) {
  try {
    return await User.destroy({
      where: {
        idUsuario: idUsuario
      }
    })
  } catch {}
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}

/*
const {getAllUsers, getOneUser, createUser, updateUser,deleteUser} = require('./models/user');

getAllUsers().then(user => {
    console.log(user[0].toJSON())
  })
  .catch(err => {
    console.log(err)
  })


getOneUsers(1).then(user => {
    console.log(user.toJSON())
  })
  .catch(err => {
    console.log(err)
  })

var user = {
    userName: "aord",
    email: "aor@hotmail.com",
    name: null,
    lastName: null,
    password: "1234",
    tipoUsuario: 1
}
createUser(user)
  .catch(err => {
    console.log(err)
  })

var user = {
    idUsuario: 2,
    userName: "aord",
    email: "aor@hotmail.com",
    name: "Angello",
    lastName: null,
    password: "1234",
    tipoUsuario: 1
}

updateUser(user)

deleteUser(2)

*/