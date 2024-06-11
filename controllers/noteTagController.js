const noteTagService = require("../services/noteTagService");

const create = async (req, res, next) => {
  try {
    const result = await noteTagService.create(req.body);

    res.status(201).json({ message: "Success", data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body

    const result = await noteTagService.update({ id, body });

    res.status(200).json({ message: "Success", data: result })
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  update
}
