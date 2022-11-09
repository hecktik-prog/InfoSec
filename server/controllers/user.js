const {User} = require('../models/models')

const getAllUsers = async (req, res) => {
    try {
        //получение всех пользователей
        const users = await User.findAll()
        
        if (!users) {
            return res.status(406).json({message:'Пользователей нет.'})
        }

        return res.status(200).json({users})

    } catch (error) {
        res.status(408).json({message:'Произошла непредвиденная ошибка.'})
    }
}

module.exports = {
    getAllUsers,
}