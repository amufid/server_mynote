const { verifyToken } = require('../lib/jwt');
const prisma = require('../lib/prisma');

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { name: 'ErroNotFound', message: 'Token not found' }
    }
    
    const accessToken = req.headers.authorization.split(" ")[1];

    const { id, email, username } = await verifyToken(accessToken)

    const user = await prisma.users.findUnique({
      where: {
        id: id
      }
    })

    if (!user) {
      throw { name: 'ErrorNotFound', message: 'User not found' }
    }

    req.userLoggedIn = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    next();
  } catch (err) {
    throw (err)
  }
}

module.exports = authentication
