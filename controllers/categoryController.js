const categoryService = require('../services/categoryService')

const create = async (req, res, next) => {
  try {
    const params = {
      body: req.body,
      id: req.userLoggedIn.id
    }
    const result = await categoryService.create(params)

    res.status(201).json({ message: 'Success', data: result })
  } catch (err) {
    next(err)
  }
}

const findAll = async (req, res, next) => {
  try {
    const result = await categoryService.findAll(req.userLoggedIn.id)

    res.status(200).json({ message: "Success", data: result })
  } catch (err) {
    next(err)
  }
}

const findOne = async (req, res, next) => {
  try {
    const result = await categoryService.findOne(req.params.id)

    res.status(200).json({ message: 'Success', data: result })
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body

    const result = await categoryService.update({ id, body })

    res.status(200).json({ message: 'Success', data: result })
  } catch (err) {
    next(err)
  }
}

const destroy = async (req, res, next) => {
  try {
    await categoryService.destroy(req.params.id)

    res.status(200).json({ message: "Success" })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  destroy
}
