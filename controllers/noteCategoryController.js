const noteCategoryService = require('../services/noteCategoryService')

const create = (req, res, next) => {
  try {
    const result = noteCategoryService.create(req.body)

    res.status(201).json({ message: 'Success', data: result })
  } catch (err) {
    next(err)
  }
}

const update = (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body

    const result = noteCategoryService.update({ id, body })

    res.status(200).json({ message: 'Success', data: result })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  update
}
