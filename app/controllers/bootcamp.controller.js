import Bootcamp from "../models/bootcamp.model.js"
import User from "../models/user.model.js";

export default {
    async createBootcamp(newBootcamp) {
        try {
            const { title, cue, description } = newBootcamp;
            const bootcamp = await Bootcamp.create({ title, cue, description });
            return bootcamp.dataValues;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    },

    async addUser({ bootcampId, userId }) {
        try {
            const user = await User.findByPk(userId);
            if (!user) throw new Error(`User id: ${userId} no encontrado`);

            const bootcamp = await Bootcamp.findByPk(bootcampId);
            if (!bootcamp) throw new Error(`Bootcamp id: ${bootcampId} no encontrado`);

            const bootcampUser = await bootcamp.addUser(user);
            return bootcampUser[0].dataValues;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    },

    async findById(bootcampId) {
        try {
            const bootcamp = await Bootcamp.scope('excludeTimestamp').findByPk(bootcampId);
            if (!bootcamp) throw new Error('Bootcamp no encontrado');
            return JSON.parse(JSON.stringify(bootcamp));
        } catch (error) {
            console.error(error.message);
            return null;
        }
    },

    async findAll() {
        try {
            const bootcamps = await Bootcamp.scope('excludeTimestamp').findAll();
            return JSON.stringify(bootcamps, null, 2);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
}

