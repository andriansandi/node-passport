'use strict';
const {
  Model
} = require('sequelize');

// Include library bcrypt
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // method untuk melakukan enkripsi
    static encrypt(password) {
      return bcrypt.hashSync(password, 10);
    }
  
    // method untuk melakukan registrasi
    static register = ({ username, password }) => {
      const encryptedPassword = this.encrypt(password);
      return this.create({ username, password: encryptedPassword });
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};