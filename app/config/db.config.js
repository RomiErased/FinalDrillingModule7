import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'db_bootcamp',
    'postgres',
    '1990', //contraseña dbeaver
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
    }
)

export default sequelize;
