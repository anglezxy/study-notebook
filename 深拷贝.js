//深拷贝

// 可继续遍历的数据类型
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'

// 不可继续遍历的数据类型
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const funcTag = '[object Function]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'

const deepTag = [mapTag,setTag,arrayTag,objectTag,argsTag]

function forEach(array,iteratee) {
    let index = -1
    const length = array.length
    while (++index<length) {
        iteratee(array[index],index)
    }
    return array
}

/**
 * 判断是否为引用类型
 * @param target
 * @returns {boolean}
 */
function isObject(target) {
    const type = typeof target
    return target !==null && (type == 'object' || type === 'function')
}

/**
 * 获取实际的类型
 * @param target
 * @returns {*}
 */
function getType(target) {
    return Object.prototype.toString.call(target)
}

/**
 * 初始化被克隆的对象
 * @param target
 * @returns {*}
 */
function getInit(target) {
    const Ctor = target.constructor
    return new Ctor()
}

/**
 * 克隆Symbol
 * @param target
 * @returns {any}
 */
function cloneSymbol(target) {
    return Object(Symbol.prototype.valueOf.call(target))
}

/**
 * 克隆正则
 * @param target
 * @returns {*}
 */
function cloneReg(target) {
    const reFlags = /\w*$/
    const result = new target.constructor(target.source,reFlags.exec(target))
    result.lastIndex = target.lastIndex
    return result
}

/**
 * 克隆函数
 */
function cloneFunc(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString()
    if (func.prototype) {
        console.log('普通函数')
        const param = paramReg.exec(funcString)
        const body = bodyReg.exec(funcString)
        if (body) {
            console.log('匹配到函数体：',body[0])
            if (param) {
                const  paramArr = param[0].split(',')
                console.log('匹配到参数：',paramArr)
                return new Function(...paramArr, body[0]);
            }else {
               return new Function(body[0])
            }
        }else {
            return null
        }
    } else {
        return eval(funcString)
    }
}
function cloneOtherType(target,type) {
    const Ctor = target.constructor
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(target)
        case regexpTag:
            return cloneReg(target)
        case symbolTag:
            return cloneSymbol(target)
        case funcTag:
            return cloneFunc(target)
        default:
            return null
    }
}

function clone(target,map = new WeakMap()) {
    if (!isObject(target)) {
        return target
    }
    const type = getType(target)
    let cloneTarget
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target,type)
    }else {
        return cloneOtherType(target,type)
    }
    if (map.get(target)) {
        return target
    }
    map.set(target,cloneTarget)
    // 克隆set
    if (type == setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value,map))
        })
        return cloneTarget
    }
    // 克隆 map
    if (type == mapTag) {
        target.forEach((value,key) => {
            cloneTarget.set(key,clone(value,map))
        })
        return cloneTarget
    }
    // 克隆对象和数组
    const keys = type === arrayTag? undefined: Object.keys(target)
    forEach(keys || target, (value,key) => {
        if (keys) {
            key = value
        }
        cloneTarget[key] = clone(target[key],map)
    })
    return cloneTarget
}





