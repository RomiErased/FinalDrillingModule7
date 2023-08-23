import User from "../models/user.model.js";

export default {
    async createUser(newUser) {
        try {
            const user = await User.create(newUser);
            return user.dataValues;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    },

    async findUserById(userId) {
        try {
            const user = await User.scope('excludeTimestamp').findByPk(userId);
            if (!user) throw new Error('User no encontrado');
            return JSON.stringify(user, null, 2);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    },

    async findAll() {
        try {
            const users = await User.scope('excludeTimestamp').findAll();
            return JSON.stringify(users, null, 2);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    },

    async updateUserById(userId, userFields) {
        const fields = ["firstName", "lastName", "email"];
        try {
            const user = await User.findByPk(userId);
            if (!user) throw new Error(`User no encontrado, id:${userId}`);
            fields.forEach(field => {
                if (userFields.hasOwnProperty(field)) {
                    user[field] = userFields[field];
                }
            });
            await user.save();
            return user.dataValues;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    },

    async deleteUserById(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) throw new Error('User no encontrado');
            await user.destroy();
            return true;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }
}
