const prisma = require('../lib/prisma')
const { createToken } = require('../lib/jwt')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (params) => {
  const { username, email, password } = params
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = await prisma.users.create({
    data: {
      username,
      email,
      password: hashedPassword
    }
  })

  return user;
}

const login = async (params) => {
  const user = await prisma.users.findUnique({
    where: {
      email: params.email
    }
  })

  if (!user) throw { name: 'ErrorNotFound', message: 'Wrong email or password' }

  const isMatch = await bcrypt.compare(params.password, user.password)

  if (!isMatch) throw { name: 'InvalidCredentials', message: 'Wrong password' }

  const token = createToken({
    id: user.id
  })

  return token
}

const findAll = async () => {
  const users = await prisma.users.findMany()

  return users;
}

const findOne = async (params) => {
  const user = await prisma.users.findUnique({
    where: {
      id: params
    }
  })

  return user;
}

const update = async (params) => {
  const { username, email, password } = params.body
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = await prisma.users.update({
    where: {
      id: params.id
    },
    data: {
      username: username,
      email: email,
      password: hashedPassword
    }
  })

  return user;
}

module.exports = {
  register,
  login,
  findAll,
  findOne,
  update,
}