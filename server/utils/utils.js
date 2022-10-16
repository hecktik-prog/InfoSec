//функция для экранирования символов
const addSlashes = (field) => {

    field = field.replace(/\\/g,'\\\\')
    field = field.replace(/\//g,'\\\/')
    field = field.replace(/\'/g,'\\\'')
    field = field.replace(/\"/g,'\\"')
    field = field.replace(/\0/g,'\\0')

    //для избежания sql-инъекций через OR (number=number)
    field = field.replace(/\(/g,'\\(')
    field = field.replace(/\)/g,'\\)')

    return field
}

//функция для валидации формы

module.exports = {
    addSlashes,
}