const { Users } = require('../models');


const createUser = async (req, res) => {
    const user = await Users.create(req.body);
    res.send({ user });
};

const signIn = async (req, res) => {
    res.send();
};

// verfiy email?? lambda?!

const signOut = async (req, res) => {
    res.send();
};

const getUserById = async (req, res) => {
    const user = await Users.find();
    res.send({ user });
};

const updateUser = async (req, res) => {
    res.send();
};


module.exports = {
    createUser,
    signIn,
    signOut,
    getUserById,
    updateUser,
};
