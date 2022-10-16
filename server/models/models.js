const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Unverified = sequelize.define('unverified', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    code: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    },
    {paranoid:true}
)

const Password = sequelize.define('password', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING},
})

const RegDates = sequelize.define('regdates', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    regdate: {type: DataTypes.DATE},
})

User.hasOne(Password)
Password.belongsTo(User)

User.hasOne(RegDates)
RegDates.belongsTo(User)

module.exports = {
    User,
    Password,
    RegDates,
    Unverified,
}