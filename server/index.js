require('dotenv').config() //подключение конфига
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

// Запуск приложения
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)

async function start() {
    try {
        await sequelize.authenticate() //установка подключения к базе данных
        await sequelize.sync() //функция, сверяющая состояние базы данных со схемой данных
        
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()