const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connections')
const bcrypt = require('bcrypt');
// const { beforeUpdate, beforeCreate } = require('./Playlist');
// const { Hooks } = require('sequelize/types/lib/hooks');

class UserLogin extends Model {
    checksPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
    checksToken(tokenKey) {
        return bcrypt.compareSync(tokenKey, this.token_for_user)
    }
}

UserLogin.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token_for_user: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
    //  {
    //     hooks: {
    //         async beforeCreate(newUserPw) {
    //             newUserPw.password = await bcrypt.hash(newUserPw.password, 10);
    //             return newUserPw;
    //         },
    //         async beforeUpdate(updateUserPw) {
    //             updateUserPw.password = await bcrypt.hash(updateUserPw.password, 10);
    //             return updateUserPw;
    //         }
    //     },
    // }, 
    {

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_login'

    })

module.exports = UserLogin