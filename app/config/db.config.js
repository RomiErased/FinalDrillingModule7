const Sequelize = require('sequelize')

// Database connection setup, it must be passed the name of the database, user and the password
const conexion = new Sequelize('db_bootcamp', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    // Dialect is the database manager we will use
    dialect: 'postgres'
})

// Export the Sequelize instance
module.exports = conexion