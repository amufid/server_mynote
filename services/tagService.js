const prisma = require('../lib/prisma')

const findAll = async (params) => {
  const tags = await prisma.tags.findMany({
    where: {
      user_id: params
    },
    include: {
      note_tags: {
        include: {
          note: true
        }
      }
    }
  })

  return tags
}

const findOne = async (params) => {
  const tag = await prisma.tags.findUnique({
    where: {
      id: +params
    },
    include: {
      note_tags: {
        include: {
          note: true
        }
      }
    }
  })

  return tag;
}

const create = async (params) => {
  const tag = await prisma.tags.create({
    data: {
      name: params.body.name,
      user_id: params.id
    }
  })

  return tag;
}

const update = async (params) => {
  const findTag = await prisma.tags.findUnique({
    where: {
      id: +params.id
    }
  })

  if (!findTag) {
    throw { name: 'ErrorNotFound', message: 'Tag not found' }
  }

  const tag = await prisma.tags.update({
    where: {
      id: +params.id
    },
    data: params.body
  })

  return tag;
}

const destroy = async (params) => {
  const findTag = await prisma.tags.findUnique({
    where: {
      id: +params
    }
  })

  if (!findTag) {
    throw { name: 'ErrorNotFound', message: 'Tag not found' }
  }

  const tag = await prisma.$transaction([
    prisma.noteTags.deleteMany({
      where: {
        tag_id: +params
      }
    }),
    prisma.tags.delete({
      where: {
        id: +params
      }
    })
  ])

  return tag;
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy
}
