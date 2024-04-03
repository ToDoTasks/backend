'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class AuthToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AuthToken.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      })
    }
  }
  AuthToken.init({
    token: DataTypes.STRING,
    expireAt: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AuthToken',
  });
  
  AuthToken.createToken =  async (user) => {
    const expiredAt = new Date();    
    const dt = new Date(expiredAt.getTime() + Number(process.env.JWT_REFRESH_EXPIRATION));
    const _token = uuidv4();
    const refreshToken = await AuthToken.create({
      token: _token,
      expireAt: dt,
      userId: user.id,
    });
    return refreshToken.token;
  };

  AuthToken.verifyExpiration = (token) => {
    return token.expireAt.getTime() < new Date().getTime();
  };
  return AuthToken;
};