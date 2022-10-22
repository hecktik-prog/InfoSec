const sequelize = require('../db')
const {DataTypes} = require('sequelize')

//Пользователь
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

//Таблица для хранения информации о незарегистрированном пользователе
const Unverified = sequelize.define('unverified', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: {type: DataTypes.STRING, unique: true},
        email: {type: DataTypes.STRING, unique: true},
        role: {type: DataTypes.STRING, defaultValue: "USER"},
        code: {type: DataTypes.STRING},
        password: {type: DataTypes.STRING},
        deleteTime: {type: DataTypes.DATE},
    }
)

//Таблица для хранения кода авторизации
const Verified = sequelize.define('verified', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: {type: DataTypes.STRING},
        code: {type: DataTypes.STRING},
        deleteTime: {type: DataTypes.DATE},
    }
)

//Пароль
const Password = sequelize.define('password', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING},
})

//Дата регистрации
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
    Verified,
}