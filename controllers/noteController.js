const noteService = require('../services/noteService')

const create = async (req, res, next) => {
  try {
    const id = req.userLoggedIn.id
    const body = req.body

    const result = await noteService.create({ id, body })

    res.status(201).json({ message: 'Success', data: result })
  } catch (err) {
    next(err)
  }
}

const findAll = async (req, res, next) => {
  try {
    const params = {
      query: req.query,
      id: req.userLoggedIn.id
    }
    const result = await noteService.findAll(params)

    res.status(200).json({ message: 'Success', data: result })
  } catch (err) {
    next(err)
  }
}

const findOne = async (req, res, next) => {
  try {
    const result = await noteService.findOne(req.params.id)

    res.status(200).json({ message: 'Success', data: result })
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body

    const result = await noteService.update({ id, body })

    res.status(200).json({ message: 'Success', data: result })
  } catch (err) {
    next(err)
  }
}

const destroy = async (req, res, next) => {
  try {
    await noteService.destroy(req.params.id)

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
