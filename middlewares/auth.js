const { verifyRefreshToken, verifyToken } = require('../lib/jwt');
const prisma = require('../lib/prisma');

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization && !req.cookies.refreshToken) {
      throw { name: 'Unauthorized', message: 'Unauthorized' }
    } else if (!req.headers.authorization || !req.cookies.refreshToken) {
      throw { name: 'Unauthorized', message: 'Unauthorized' }
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    const refreshToken = req.cookies.refreshToken;

    try {
      const decoded = await verifyToken(accessToken)
      let user = await prisma.users.findUnique({
        where: {
          id: decoded.id
        }
      })

      if (!user) {
        throw { name: 'Unauthorized', message: 'Unauthorized' }
      }

      req.userLoggedIn = {
        id: user.id,
        email: user.email,
      };

      next();
    } catch (error) {

      try {
        const decoded = await verifyRefreshToken(refreshToken)
        user = await prisma.users.findUnique({
          where: {
            id: decoded.id
          }
        })

        if (!user) {
          throw { name: 'Unauthorized', message: 'Unauthorized' }
        }

        req.userLoggedIn = {
          id: user.id,
          email: user.email,
        };

        next();
      } catch (error) {
        next(error)
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authentication
