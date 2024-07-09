const authService = require('../services/authService')

const register = async (req, res, next) => {
  try {
    const body = req.body
    const user = await authService.register(body)

    res.status(201).json({ message: 'Success', data: user })
  } catch (err) {
    next(err);
  }
}

const login = async (req, res, next) => {
  try {
    const body = req.body
    const user = await authService.login(body)
    const refreshToken = user.refreshToken

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      sameSite: 'Strict',
      secure: false,
      path: '/'
    })

    res.status(200).json({
      message: 'Success',
      accessToken: user
    })
  } catch (err) {
    next(err);
  }
}

const findAll = async (req, res, next) => {
  try {
    const users = await authService.findAll()

    res.status(200).json({ message: 'Success', data: users })
  } catch (err) {
    next(err);
  }
}

const findOne = async (req, res, next) => {
  try {
    const id = req.userLoggedIn.id

    const user = await authService.findOne(id)

    res.status(200).json({ message: 'Success', data: user })
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const id = req.userLoggedIn.id
    const body = req.body

    await authService.update({ id, body })

    res.status(200).json({ message: 'Success' })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  findAll,
  findOne,
  update,
}