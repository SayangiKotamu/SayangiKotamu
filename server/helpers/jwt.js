const jwt = require('jsonwebtoken')

const jwtSign = (payload) => {
    let accessToken = jwt.sign(payload, process.env.SECRET_KEY)
    return accessToken
}

const jwtVerify = (access_token) => {
    const payload = jwt.verify(access_token, process.env.SECRET_KEY)
    return payload
}

const jwtSignEmailActivate = (payload) => {
    let accessToken = jwt.sign(payload, process.env.JWT_EMAIL_ACTIVATE, {
        expiresIn: '30m',
    })
    return accessToken
}

const jwtVerifyEmailActivate = (access_token) => {
    const payload = jwt.verify(access_token, process.env.JWT_EMAIL_ACTIVATE)
    return payload
}

module.exports = {
    jwtSign,
    jwtVerify,
    jwtSignEmailActivate,
    jwtVerifyEmailActivate,
}
