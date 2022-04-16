const { Sequelize} = require('sequelize');

const path = 'mysql://root:root@localhost:3306/bdd_respedapp';

const sequelize = new Sequelize(path, { operatorsAliases: false });

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}).finally(() => {
  sequelize.close();
});

 
  module.exports = {sequelize};
