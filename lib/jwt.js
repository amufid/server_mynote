const jwt = require('jsonwebtoken')

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_JWT_SECRET, { expiresIn: '7d' })
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return reject(err)
      }
      return resolve(payload)
    })
  })
}

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_JWT_SECRET, (err, payload) => {
      if (err) {
        return reject(err)
      }
      return resolve(payload)
    })
  })
}

module.exports = {
  createToken,
  verifyToken,
  createRefreshToken,
  verifyRefreshToken
}
