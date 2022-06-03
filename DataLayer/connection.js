const {
  Sequelize
} = require('sequelize');

const path = 'mysql://angelojz7:fitmanager65656566@mysql-angelojz7.alwaysdata.net/angelojz7_respedapp';
//const path = 'mysql://root:root@localhost:3306/respedappbdd';

const sequelize = new Sequelize(path, {
  operatorsAliases: false
});

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}).finally(() => {
  sequelize.close();
});


module.exports = {
  sequelize,
  path
};