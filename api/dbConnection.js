const { Sequelize } = require('sequelize');
const pg = require('pg');


var sequelize = new Sequelize(process.env.RDS_DB_NAME, process.env.RDS_DB_USER, process.env.RDS_DB_PW, {
    host: process.env.RDS_DB_HOST,
    port: 5432,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    },
    dialectModule: pg,
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
});

module.exports = {
    sequelize,
};
