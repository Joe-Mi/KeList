const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');

// const sequelize = new Sequelize('kelistdb', 'postgres', 'Mitema2033', {
//     host: 'localhost',
//     dialect: 'postgres',
// });

const sequelize = new Sequelize(
    'kelistdb',
    'postgres',
    'postgres',
    {
      host: 'db',
      dialect: 'postgres',
    }
  ); 
  

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    })


Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});



module.exports = db;