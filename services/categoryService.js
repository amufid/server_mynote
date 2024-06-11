const prisma = require('../lib/prisma')

const create = async (params) => {
  const { name, description } = params.body
  const category = await prisma.categories.create({
    data: {
      name: name,
      description: description,
      user_id: params.id
    }
  })

  return category;
}

const findAll = async (params) => {
  const categories = await prisma.categories.findMany({
    where: {
      user_id: params
    },
    include: {
      note_category: {
        include: {
          note: true
        }
      }
    }
  })
  return categories;
}

const findOne = async (params) => {
  const category = await prisma.categories.findUnique({
    where: {
      id: +params
    },
    include: {
      note_category: {
        include: {
          note: true
        }
      }
    }
  })
  return category;
}

const update = async (params) => {
  const findCategory = await prisma.categories.findUnique({
    where: {
      id: +params.id
    }
  })

  if (!findCategory) {
    throw { name: "ErrorNotFound", message: "Category not found" }
  }

  const category = await prisma.categories.update({
    where: {
      id: +params.id
    },
    data: params.body
  })

  return category;
}

const destroy = async (params) => {
  const findCategory = await prisma.categories.findUnique({
    where: {
      id: +params
    }
  })

  if (!findCategory) {
    throw { name: "ErrorNotFound", message: "Category not found" }
  }

  const category = await prisma.categories.delete({
    where: {
      id: +params
    }
  })

  return category;
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  destroy
}
