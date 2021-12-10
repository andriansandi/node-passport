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

    // Method checkPassword
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    // Method untuk authenticate, login
    static authenticate = async({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username }})
        if(!user) return Promise.reject("User not found!");
        const isPasswordValid = user.checkPassword(password);
        if(!isPasswordValid) return Promise.reject("Wrong password");
        return Promise.resolve(user);
      } catch(err) {
        return Promise.reject(err);
      }
    }

  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};