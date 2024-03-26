const db = require('../models/index');

const fetchUserData = async (req, res) => {
    const user = await db.User.findOne({
        where: {id: req.user.id},
        attributes: {
            exclude: ['password']
        }
    });
    res.json(user);
};

module.exports = {
    fetchUserData,
};