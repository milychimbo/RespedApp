const {
  Sequelize
} = require('sequelize');

let path;

if (process.env.ENVIROMENT == "local") {
  path = `mysql://${process.env.DB_LOCAL_USER}:${process.env.DB_LOCAL_PWD}@${process.env.DB_LOCAL_HOST}:${process.env.DB_LOCAL_PORT}/${process.env.DB_LOCAL_NAME}`;
} else if (process.env.ENVIROMENT == "remoto") {
  path = `mysql://${process.env.DB_PRO_USER}:${process.env.DB_PRO_PWD}@${process.env.DB_PRO_HOST}:${process.env.DB_PRO_PORT}/${process.env.DB_PRO_NAME}`;
} else if (process.env.ENVIROMENT == "alwaysdata") {
  path = `mysql://${process.env.DB_ALWYS_USER}:${process.env.DB_ALWYS_PWD}@${process.env.DB_ALWYS_HOST}:${process.env.DB_ALWYS_PORT}/${process.env.DB_ALWYS_NAME}`;
}

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