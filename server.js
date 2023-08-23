import sequelize from './app/config/db.config.js';
import './app/models/index.js';
import userController from './app/controllers/user.controller.js';
import bootcampController from './app/controllers/bootcamp.controller.js';

async function createUserAndLog(user) {
    try {
        const createdUser = await userController.createUser(user);
        console.log('>> Se ha creado el usuario:', createdUser);
        return createdUser.id;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function createBootcampAndLog(bootcamp) {
    try {
        const createdBootcamp = await bootcampController.createBootcamp(bootcamp);
        console.log('>> Creado el bootcamp:', createdBootcamp);
        return createdBootcamp.id;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function addUserToBootcampAndLog(userId, bootcampId) {
    try {
        const bootcampUser = await bootcampController.addUser({
            bootcampId,
            userId
        });
        console.log(
            `\n***************************\n` +
            `Agregado el usuario id=${bootcampUser.userId} al bootcamp con id=${bootcampUser.bootcampId}` +
            `\n***************************\n`
        );
    } catch (error) {
        console.error(error.message);
    }
}

async function main() {
    try {
        await sequelize.sync({ force: true, alter: true });

        console.log('BD sincronizada');

        const users = await Promise.all([
            createUserAndLog({ firstName: "Mateo", lastName: "Díaz", email: "mateo.diaz@correo.com" }),
            createUserAndLog({ firstName: "Santiago", lastName: "Mejías", email: "santiago.mejias@correo.com" }),
            createUserAndLog({ firstName: "Lucas", lastName: "Rojas", email: "lucas.rojas@correo.com" }),
            createUserAndLog({ firstName: "Facundo", lastName: "Fernandez", email: "facundo.fernandez@correo.com" })
        ]);

        const bootcamps = await Promise.all([
            createBootcampAndLog({
                title: "Introduciendo El Bootcamp De React.",
                cue: 10,
                description: "React es la librería más usada en JavaScript para el desarrollo de interfaces."
            }),
            createBootcampAndLog({
                title: "Bootcamp Desarrollo Web Full Stack.",
                cue: 12,
                description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS."
            }),
            createBootcampAndLog({
                title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning.",
                cue: 18,
                description: "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning."
            })
        ]);

        const bootcampsUsers = [
            { bootcampIndex: 0, usersIndexes: [0, 1] },
            { bootcampIndex: 1, usersIndexes: [0] },
            { bootcampIndex: 2, usersIndexes: [0, 1, 2] }
        ];

        for (const { bootcampIndex, usersIndexes } of bootcampsUsers) {
            for (const userIndex of usersIndexes) {
                await addUserToBootcampAndLog(users[userIndex], bootcamps[bootcampIndex]);
            }
        }

        console.log(await bootcampController.findById(1));
        console.log(await bootcampController.findAll());
        console.log(await userController.findUserById(1));
        console.log(await userController.findAll());
        console.log(await userController.updateUserById(1, { firstName: 'Pedro', lastName: 'Sánchez' }));
        await userController.deleteUserById(1);
    } catch (error) {
        console.error(error.message);
    }
}

main();
