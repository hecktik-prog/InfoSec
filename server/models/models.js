const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Unverified = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    code: {type: DataTypes.STRING},
})

const Password = sequelize.define('password', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING},
})

const RegDates = sequelize.define('regdates', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    regtime: {type: DataTypes.TIME},
    regdate: {type: DataTypes.DATEONLY},
})

User.hasOne(Password)
User.belongsTo(Password)

User.hasOne(RegDates)
User.belongsTo(RegDates)

module.exports = {
    User,
    Password,
    RegDates,
    Unverified,
}