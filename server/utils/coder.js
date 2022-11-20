const { Buffer } = require('buffer')

/**
 * Размер одного блока данных
 */
let BLOCK_SIZE = 16

/**
 * Итерационные константы
 */
const iterConsts = []

/**
 * Итерационные ключи
 */
const iterKey = []

/**
 * мастер-ключ
 */
const masterKey = []

/**
 * Массив S-преобразований
 */
let pi = Buffer.from([
    0xFC, 0xEE, 0xDD, 0x11, 0xCF, 0x6E, 0x31, 0x16,
    0xFB, 0xC4, 0xFA, 0xDA, 0x23, 0xC5, 0x04, 0x4D,
    0xE9, 0x77, 0xF0, 0xDB, 0x93, 0x2E, 0x99, 0xBA,
    0x17, 0x36, 0xF1, 0xBB, 0x14, 0xCD, 0x5F, 0xC1,
    0xF9, 0x18, 0x65, 0x5A, 0xE2, 0x5C, 0xEF, 0x21,
    0x81, 0x1C, 0x3C, 0x42, 0x8B, 0x01, 0x8E, 0x4F,
    0x05, 0x84, 0x02, 0xAE, 0xE3, 0x6A, 0x8F, 0xA0,
    0x06, 0x0B, 0xED, 0x98, 0x7F, 0xD4, 0xD3, 0x1F,
    0xEB, 0x34, 0x2C, 0x51, 0xEA, 0xC8, 0x48, 0xAB,
    0xF2, 0x2A, 0x68, 0xA2, 0xFD, 0x3A, 0xCE, 0xCC,
    0xB5, 0x70, 0x0E, 0x56, 0x08, 0x0C, 0x76, 0x12,
    0xBF, 0x72, 0x13, 0x47, 0x9C, 0xB7, 0x5D, 0x87,
    0x15, 0xA1, 0x96, 0x29, 0x10, 0x7B, 0x9A, 0xC7,
    0xF3, 0x91, 0x78, 0x6F, 0x9D, 0x9E, 0xB2, 0xB1,
    0x32, 0x75, 0x19, 0x3D, 0xFF, 0x35, 0x8A, 0x7E,
    0x6D, 0x54, 0xC6, 0x80, 0xC3, 0xBD, 0x0D, 0x57,
    0xDF, 0xF5, 0x24, 0xA9, 0x3E, 0xA8, 0x43, 0xC9,
    0xD7, 0x79, 0xD6, 0xF6, 0x7C, 0x22, 0xB9, 0x03,
    0xE0, 0x0F, 0xEC, 0xDE, 0x7A, 0x94, 0xB0, 0xBC,
    0xDC, 0xE8, 0x28, 0x50, 0x4E, 0x33, 0x0A, 0x4A,
    0xA7, 0x97, 0x60, 0x73, 0x1E, 0x00, 0x62, 0x44,
    0x1A, 0xB8, 0x38, 0x82, 0x64, 0x9F, 0x26, 0x41,
    0xAD, 0x45, 0x46, 0x92, 0x27, 0x5E, 0x55, 0x2F,
    0x8C, 0xA3, 0xA5, 0x7D, 0x69, 0xD5, 0x95, 0x3B,
    0x07, 0x58, 0xB3, 0x40, 0x86, 0xAC, 0x1D, 0xF7,
    0x30, 0x37, 0x6B, 0xE4, 0x88, 0xD9, 0xE7, 0x89,
    0xE1, 0x1B, 0x83, 0x49, 0x4C, 0x3F, 0xF8, 0xFE,
    0x8D, 0x53, 0xAA, 0x90, 0xCA, 0xD8, 0x85, 0x61,
    0x20, 0x71, 0x67, 0xA4, 0x2D, 0x2B, 0x09, 0x5B,
    0xCB, 0x9B, 0x25, 0xD0, 0xBE, 0xE5, 0x6C, 0x52,
    0x59, 0xA6, 0x74, 0xD2, 0xE6, 0xF4, 0xB4, 0xC0,
    0xD1, 0x66, 0xAF, 0xC2, 0x39, 0x4B, 0x63, 0xB6
])

/**
 * Массив коэффициентов для R-преобразования
 */
let consts = Buffer.from([
    0x94, 0x20, 0x85, 0x10, 0xC2, 0xC0, 0x01, 0xFB,
    0x01, 0xC0, 0xC2, 0x10, 0x85, 0x20, 0x94, 0x01
])

/**
 * Расчитывает исключающее ИЛИ двух буфферов
 *
 * @param {Buffer} a - левый аргумент XOR
 * @param {Buffer} b - правый аргумент XOR
 */
function X(a, b) {

    let result = Buffer.alloc(BLOCK_SIZE)

    for (let i = 0; i < BLOCK_SIZE; i = i + 1) {
        result[i] = a[i] ^ b[i]
    }

    return result
}

/**
 * Реализует нелинейное биективное преобразование (преобразование S)
 *
 * @param {Buffer} buff
 */
function S(buff) {
    let result = Buffer.alloc(0)
    for (let i = 0; i < buff.length; i = i + 1) {
        result = Buffer.concat([result, Buffer.from([pi[buff[i]]])])
    }
    while (result.length < BLOCK_SIZE) {
        result = Buffer.concat([Buffer.from([0]), result])
    }

    return result
}

/**
 * Реализует преобразование R
 *
 * @param {Buffer} buff
 */
function R(buff) {
    let result = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    let temp = 0

    for (let i = BLOCK_SIZE - 1; i >= 1; i = i - 1) {
        result[i] = buff[i-1]
    }

    for (let i = 0; i < BLOCK_SIZE; i = i + 1) {
        temp ^= galoisField(consts[i], buff[i])
        
    }

    result[0] = temp

    return result
}

/**
 * Реализует линейное преобразование (преобразование L)
 *
 * @param {Buffer} buff
 */
function L(buff) {
    let result = buff.slice()
    for (let i = 0; i < BLOCK_SIZE; i = i + 1) {
        result = R(result)
    }

    return result
}

/**
 * Реализует умножение чисел в поле Галуа над полиномом x^8 + x^7 + x^6 + x + 1
 *
 * @param {Buffer} a
 * @param {Buffer} b
 */
function galoisField(a, b) {
    let result = 0
    let temp
    let i
    for (i = 0; i < BLOCK_SIZE/2; i = i + 1) {
        if (b & 1) {
            result ^= a
        }

        temp = a & 0x80
        a <<= 1

        if (temp) {
            a ^= 0xc3
        }

        b >>= 1
    }

    return result
}

/**
 * Реализует обратное нелинейное биективное преобразование (обратное преобразование S)
 *
 * @param {Buffer} buff
 */
 function reverse_S(buff) {
    while (buff.length < BLOCK_SIZE) {
        buff = Buffer.concat([buff, Buffer.from([0])])
    }

    let result = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    for (let i = 0; i < BLOCK_SIZE; i = i + 1) {
        result[i] = pi.indexOf(buff[i])
    }

    return result;
}

/**
 * Реализует обратное преобразование R
 *
 * @param {Buffer} buff
 */
function reverse_R(buff) {

    let temp = 0;
    let result = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    
    for(let i = 0; i < BLOCK_SIZE-1; i = i + 1){
        result[i] = buff[i+1]
    }
    temp = buff[0]
    for (let i = 0; i < BLOCK_SIZE-1; i = i + 1)
    {
        temp ^= galoisField(buff[i + 1], consts[i])
    }
    result[15] = temp
    return result
}

/**
 * Реализует обратное линейное преобразование (обратное преобразование L)
 *
 * @param {Buffer} buff
 */
function reverse_L(buff) {
    let result = buff.slice()
    for (let j = 0; j < BLOCK_SIZE; j = j + 1) {
        result = reverse_R(result)
    }
    return result
}

/**
 * Генерация итерационных констант
 */
function genConsts() {
    for (let i = 1; i <=32; i = i + 1) {
        let temp = i
        let result = Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
        result[15] = temp
        iterConsts.push(L(result))
    }
}

/**
 * Реализует одну итерацию развертывания ключа
 *
 * @param {Buffer} key1 - первый из пары ключей
 * @param {Buffer} key2 - второй из пары ключей
 * @param {Buffer} iterConst - итерационная константа
 */
function F(key1, key2, iterConst) {
    const key = []
    let temp = Buffer.alloc(0)
    let nextKey1 = Buffer.alloc(0)
    let nextKey2 = key1

    temp = X(key1, iterConst)
    temp = S(temp)
    temp = L(temp)

    nextKey1 = X(temp, key2)
    key.push(nextKey1)
    key.push(nextKey2)

    return key
}

/**
 * Развертывание ключей
 *
 * @param {Buffer} masterKey - мастер-ключ
 */
function expandKeys(masterKey) {
    //первые два итерационных ключа равны паре мастер-ключа
    let key1 = Buffer.alloc(BLOCK_SIZE)
    let key2 = Buffer.alloc(BLOCK_SIZE)

    for (let i = 0; i < BLOCK_SIZE; i=i+1) {
        key1[i] = masterKey[i]
    }

    for (let i = BLOCK_SIZE; i < BLOCK_SIZE*2; i=i+1) {
        key2[i - BLOCK_SIZE] = masterKey[i]
    }

    let iterPart1 = [Buffer.alloc(0), Buffer.alloc(0)]
    let iterPart2 = [Buffer.alloc(0), Buffer.alloc(0)]

    //вычисление итерационных констант
    genConsts()
    iterKey[0] = key1
    iterKey[1] = key2
    iterPart1[0] = key1
    iterPart1[1] = key2
    //вычисление остальных итерационных ключей
    for (let k = 0; k < 4; k = k + 1) {
        for (let j = 0; j < 8; j = j + 2) {
            iterPart2 = F(iterPart1[0], iterPart1[1], iterConsts[j + 8 * k])
            iterPart1 = F(iterPart2[0], iterPart2[1], iterConsts[j + 1 + 8 * k])
        }

        iterKey[2 * k + 2] = iterPart1[0]
        iterKey[2 * k + 3] = iterPart1[1]
    }
}

/**
 * Шифрование блока
 *
 * @param {Buffer} block
 */
function enc(block) {
    for(let i = 0; i < iterKey.length - 1; i=i+1){
        block = X(block, iterKey[i])
        block = S(block)
        block = L(block)
    }
    block = X(block, iterKey[iterKey.length - 1])
    return block
}

/**
 * Расшифровка блока
 *
 * @param {Buffer} block
 */
function dec(block) {
    block = X(block, iterKey[iterKey.length - 1])

    for(let i = iterKey.length - 2; i >= 0; i=i-1) {
        block = reverse_L(block)
        block = reverse_S(block)
        block = X(block, iterKey[i])
    }

    return block
}

/**
 * Шифрование текста
 *
 */
const encrypt = (inputStr) => {
    let blocks = Math.floor(inputStr.length/BLOCK_SIZE)
    let outputStr = Buffer.alloc((blocks+1)*BLOCK_SIZE)

    for(let i = 0; i < blocks; i = i + 1) {
        let temp = Buffer.alloc(BLOCK_SIZE)
        temp = enc(inputStr.slice(i*BLOCK_SIZE,i*BLOCK_SIZE + BLOCK_SIZE))

        for(let j = 0; j < BLOCK_SIZE; j = j + 1) {
            outputStr[BLOCK_SIZE*i+j]=temp[j]
        }
    }

    if(inputStr.length%BLOCK_SIZE != 0) {
        let temp = Buffer.alloc(BLOCK_SIZE)
        temp = enc(inputStr.slice(blocks*BLOCK_SIZE,blocks*BLOCK_SIZE + inputStr.length%BLOCK_SIZE))

        for(let j = 0; j < BLOCK_SIZE; j = j + 1) {
            outputStr[BLOCK_SIZE*blocks+j]=temp[j]
        }
    }
    return outputStr
}

/**
 * Расшифровка текста
 */
const decrypt = (encryptedStr) => {
    let decryptedStr = Buffer.alloc(encryptedStr.length)
    let blocks = encryptedStr.length/BLOCK_SIZE

    for(let i = 0; i < blocks; i = i + 1) {
        let temp = Buffer.alloc(BLOCK_SIZE)
        temp = dec(encryptedStr.slice(i*BLOCK_SIZE,i*BLOCK_SIZE + BLOCK_SIZE))

        for(let j = 0; j < BLOCK_SIZE; j = j + 1) {
            decryptedStr[BLOCK_SIZE*i+j]=temp[j]    
        }
    }
    return decryptedStr
}

/**
 * Генерация мастер-ключа и развертывание ключей
 */
function keyGeneration() {
    masterKey.length = 0
    for(let i = 0; i < 32; i=i+1){
        masterKey.push(Math.floor(Math.random() * 255))
    }
    expandKeys(Buffer.from(masterKey))
}

/**
 * Pазвертывание ключей c использованием мастер-ключа
 * @param {Array} masterkey
 */
 function keyGenerationWithMasterkey(masterkey) {
    expandKeys(Buffer.from(masterkey))
}

/*                      EXPORT                    */
const encryptUserText = (userString) => {
    //генерация итерационных ключей
    keyGeneration()

    //шифрование
    let encrypted = encrypt(Buffer.from(userString))
    
    const total = []
    total.push(masterKey)
    total.push(encrypted)
    return total
}

const decryptUserText = (masterkey, encryptedUserString) => {
    //генерация итерационных ключей
    keyGenerationWithMasterkey(masterkey)

    //расшифровка
    let decrypted = decrypt(encryptedUserString).toString().split('\0').join('')

    return decrypted
}

module.exports = {
    encryptUserText,
    decryptUserText,
}