module.exports = {
    development: {
        database: process.env.RDS_DB_NAME,
        username: process.env.RDS_DB_USER,
        password: process.env.RDS_DB_PW,
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
        pool: { maxConnections: 5, maxIdleTime: 30},
        language: 'en'
    },
}
