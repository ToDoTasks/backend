const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { createToken, verifyExpiration } = db.AuthToken;

//sign-up
const register = async (req, res) => {
    try {
        const { username, password} = req.body;
        const userExists = await db.User.findOne({
            where: {username}
        });
        if (userExists) return res.status(400).json({message:'Username is already used'});

        await db.User.create({
            username,
            password: await bcrypt.hash(password, 15)
        });
        return res.status(200).json({message:'Registration successful'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'SignUp error'});
    }
};

//sign-in
const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await db.User.findOne({
            where : {username}
        });
        if(!user) return res.status(404).json({message:'User not found'});

        // check password
        const passwordValid = await bcrypt.compare(password, user.password);
        if(!passwordValid) return res.status(404).json({message:'Incorrect username or password'});

        // Authenticate user with jwt
        const token = jwt.sign({ id: user.id, name: user.username}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });
        let refreshToken = await createToken(user);
        return res.status(200).json({
            username : user.username,
            accessToken : token,
            refreshToken,
            expire_at: process.env.JWT_EXPIRATION,
            refresh_token_expire_at: process.env.JWT_REFRESH_EXPIRATION
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'});
    }
};

const refreshToken = async (req, res) => {
    const { requestToken } = req.body;
    try{
        let refreshToken = await db.AuthToken.findOne({
            where: {
                token: requestToken
            }
        });
        if(!refreshToken) return res.status(403).json({message:'Invalid refresh token'});
        if(verifyExpiration(refreshToken)){
            db.AuthToken.destroy({
                where: {
                    id: refreshToken.id
                }
            });
            return res.status(403).json({message:'Refresh token expired'});
        }
        const user = await db.User.findOne({
            where: {
                id: refreshToken.userId
            },
            attributes: {
                exclude: ['password']
            }
        });
        let newAccessToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, 
            {expiresIn: process.env.JWT_REFRESH_EXPIRATION,}
        );

        return res.status(200).json({
            accessToken: newAccessToken,
            expire_at: process.env.JWT_EXPIRATION,
        })
    } catch (error){
        console.log(error);
        return res.status(500).json({message:'Internal server error'});
    }
};

module.exports = {
    register,
    signIn,
    refreshToken
};