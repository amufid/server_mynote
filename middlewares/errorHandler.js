const errorHandler = (err, req, res, next) => {
  if (err.name === 'ErrorNotFound') {
    return res.status(404).json({ message: err.message || 'Not Found' })
  } else if (err.name === 'InvalidCredentials') {
    return res.status(401).json({ message: err.message || 'Invalid Credentials' })
  } else if (err.name === 'ErrorBadRequest') {
    return res.status(400).json({ message: err.message || 'Bad Request' })
  }

  console.log(err);
  next()
}

module.exports = errorHandler;
