const { User, Message } = require('../models/models')
const { addSlashes } = require('../utils/utils')
const { encryptUserText, decryptUserText } = require('../utils/coder')

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

const encodeText = async (req, res) => {
    try {
        let {text} = req.body
    
        //шифрование
        let result = encryptUserText(text)
        let encryptedText = result.pop()
        let masterkey = result.pop()
        //приведение результатов в 16-ричный формат
        encryptedText = encryptedText.toString('hex')
        masterkey = masterkey.join(' ')

        const msg = await Message.create({
            usertext: encryptedText,
            masterkey: masterkey,
        })

        return res.status(200).json({
            message: 'Текст успешно зашифрован.'
        })

    
    } catch (error) {
        res.status(408).json({message:'Произошла непредвиденная ошибка.'})
    }
}

const decodeText = async (req, res) => {
    try {
        const {id} = req.body
        //проверка на существование записи
        const msg = await Message.findByPk(id)
        if (!msg) {
             return res.status(406).json({
                message:'Ошибка при выборе ключа.'
            })
        }

        //подготовка к расшифровке
        let masterkey = msg.masterkey
        masterkey = masterkey.split(' ').map((element)=>{
            return Number(element)
        })
        let encrypted = msg.usertext
        encrypted = Buffer.from(encrypted, "hex")
        let result = decryptUserText(masterkey, encrypted)

        return res.status(200).json({
            result,
            message: 'Текст успешно расшифрован.'
        })

    } catch (error) {
        res.status(408).json({message:'Произошла непредвиденная ошибка.'})
    }
}

const getAllTexts = async (req, res) => {
    try {

        //проверка на существование записей
        const messages = await Message.findAll()

        if (!messages) {
             return res.status(406).json({
                message:'Записей нет.'
            })
        }

        return res.status(200).json({messages})

    } catch (error) {
        res.status(408).json({message:'Произошла непредвиденная ошибка.'})
    }
}

module.exports = {
    getAllUsers,
    encodeText,
    decodeText,
    getAllTexts,
}