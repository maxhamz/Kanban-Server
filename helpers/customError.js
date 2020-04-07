function customError(code, message) {
    let err = new Error()
    err.message = message
    err.code = code
    return err
}

module.exports =  { customError } 