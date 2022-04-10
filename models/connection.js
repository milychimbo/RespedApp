const { Sequelize, DataTypes } = require('sequelize');

const connection = new Sequelize('bdd_respedapp', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
})

connection.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })

  const User = connection.define('usuario', {
    idUsuario: {type: DataTypes.INTEGER, primaryKey: true,allowNull: false,autoIncrement: true},
    userName: {type: DataTypes.STRING,allowNull: false},
    email:  {type: DataTypes.STRING,allowNull: false},
    name:  {type: DataTypes.STRING},
    lastName:  {type: DataTypes.STRING},
    password:  {type: DataTypes.STRING,allowNull: false},
    tipoUsuario:  {type: DataTypes.TINYINT,allowNull: false},
  }, {
    tableName: 'usuario',
    timestamps: false
  })

  /*User.findAll({ attributes: ['idUsuario','userName','email','name','lastName','password','tipoUsuario'] })
  .then(users => {
    console.log(users[0].toJSON())
  })
  .catch(err => {
    console.log(err)
  })*/
  
  /*User.findByPk(1,{ attributes: ['userName'] })
  .then(user => {
    console.log(user.toJSON())
  })
  .catch(err => {
    console.log(err)
  })*/

  //User.create({userName: "angordee", email: "angelloordonez@hotmail.com", password: "1234",tipoUsuario: "1"});
/*
User.update(
  { userName: "patito" },
  { where: { idUsuario: 1 } }
)

User.destroy({
  where: {
      idUsuario: 2
  }
})*/