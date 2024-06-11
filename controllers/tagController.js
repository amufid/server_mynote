const tagService = require('../services/tagService')

const findAll = async (req, res, next) => {
  try {
    const result = await tagService.findAll(req.userLoggedIn.id);

    res.status(200).json({ message: "Success", data: result })
  } catch (err) {
    next(err);
  }
}

const findOne = async (req, res, next) => {
  try {
    const result = await tagService.findOne(req.params.id);

    res.status(200).json({ message: 'Success', data: result });
  } catch (err) {
    next(err);
  }
}

const create = async (req, res, next) => {
  try {
    const params = {
      body: req.body,
      id: req.userLoggedIn.id
    }
    const result = await tagService.create(params);

    res.status(201).json({ message: 'Success', data: result });
  } catch (err) {
    next(err);
  }
}

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const result = await tagService.update({ id, body });

    res.status(200).json({ message: "Success", data: result })
  } catch (err) {
    next(err);
  }
}

const destroy = async (req, res, next) => {
  try {
    await tagService.destroy(req.params.id);

    res.status(200).json({ message: 'Success' })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy
}
