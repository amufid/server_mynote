const attachmentService = require('../services/attachmentService')

const findAll = async (req, res, next) => {
  try {
    const attachments = await attachmentService.findAll()

    res.status(200).json({ message: 'Success', data: attachments })
  } catch (err) {
    next(err)
  }
}

const findOne = async (req, res, next) => {
  try {
    const attachment = await attachmentService.findOne(req.params.id)

    res.status(200).json({ message: 'Success', data: attachment })
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const params = {
      body: req.body,
      file: req.file
    }
    const attachment = await attachmentService.create(params)

    res.status(201).json({ message: 'Success', data: attachment })
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
}

const destroy = async (req, res, next) => {
  try {
    await attachmentService.destroy(req.params.id)

    res.status(200).json({ message: "Success" })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
}
