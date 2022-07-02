const {
  Sequelize
} = require('sequelize');

let path = "mysql://angelojz7:fitmanager65656566@mysql-angelojz7.alwaysdata.net/angelojz7_respedapp";

// if (process.env.ENVIROMENT == "local") {
//   path = `mysql://${process.env.DB_LOCAL_USER}:${process.env.DB_LOCAL_PWD}@${process.env.DB_LOCAL_HOST}:${process.env.DB_LOCAL_PORT}/${process.env.DB_LOCAL_NAME}`;
// } else if (process.env.ENVIROMENT == "remoto") {
//   path = `mysql://${process.env.DB_PRO_USER}:${process.env.DB_PRO_PWD}@${process.env.DB_PRO_HOST}:${process.env.DB_PRO_PORT}/${process.env.DB_PRO_NAME}`;
// }

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