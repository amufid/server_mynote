const prisma = require('../lib/prisma')

const findAll = async (params) => {
  let { search } = params.query
  let searchFilter = {}

  if (search) {
    searchFilter = {
      title: {
        equals: `%${search}%`,
        mode: 'insensitive'
      }
    }
  }
  console.log(params.id);
  const notes = await prisma.notes.findMany({
    where: {
      ...searchFilter,
      user_id: params.id
    },
    include: {
      note_tags: {
        include: {
          tag: true
        }
      },
      note_categories: {
        include: {
          category: true
        }
      },
      attachment: true
    }
  })

  return notes;
}

const findOne = async (params) => {
  const note = await prisma.notes.findUnique({
    where: {
      id: +params
    },
    include: {
      note_tags: {
        include: {
          tag: true
        }
      },
      note_categories: {
        include: {
          category: true
        }
      },
      attachment: true
    }
  })

  return note;
}

const create = async (params) => {
  const { title, content, tag_id, category_id } = params.body

  if (!title || !content) {
    throw { name: 'ErrorBadRequest', message: 'Title and content is required' }
  }

  if (!tag_id && !category_id) {
    const note = await prisma.notes.create({
      data: {
        user_id: params.id,
        title: title,
        content: content
      },
    })
    return note;
  }

  // mencari id terakhir dari table notes 
  const findLastId = await prisma.notes.findMany({
    orderBy: {
      id: 'desc' || 1
    },
    take: 1
  })

  let lastId = findLastId[0].id
  console.log(lastId);

  const findTag = await prisma.tags.findUnique({
    where: {
      id: +tag_id
    }
  })

  if (tag_id && !category_id) {

    if (!findTag) {
      throw { name: 'ErrorNotFound', message: 'Tag not found' }
    }

    const note = await prisma.$transaction([
      prisma.notes.create({
        data: {
          user_id: params.id,
          title: title,
          content: content
        },
      }),
      prisma.noteTags.create({
        data: {
          note_id: lastId + 1,
          tag_id: findTag.id
        },
      })

    ])
    return note;
  }

  const findCategory = await prisma.categories.findUnique({
    where: {
      id: +category_id
    }
  })

  if (!findCategory) {
    throw { name: 'ErrorNotFound', message: 'Category not found' }
  }

  if (!tag_id && category_id) {
    const note = await prisma.$transaction([
      prisma.notes.create({
        data: {
          user_id: params.id,
          title: title,
          content: content
        },
      }),
      prisma.noteCategories.create({
        data: {
          note_id: lastId + 1,
          category_id: findCategory.id
        },
      }),
    ])

    return note;
  }

  // membuat data baru pada 3 tabel secara bersamaan dengan $transaction
  const note = await prisma.$transaction([
    prisma.notes.create({
      data: {
        user_id: params.id,
        title: title,
        content: content
      },
    }),
    prisma.noteTags.create({
      data: {
        note_id: lastId + 1,
        tag_id: findTag.id
      },
    }),
    prisma.noteCategories.create({
      data: {
        note_id: lastId + 1,
        category_id: findCategory.id
      },
    }),
  ])

  return note;
}

const update = async (params) => {
  const findId = await prisma.notes.findUnique({
    where: {
      id: +params.id
    }
  })

  if (!findId) {
    throw { name: 'ErrorNotFound', message: 'Note not found' }
  }

  const note = await prisma.notes.update({
    where: {
      id: +params.id
    },
    data: params.body
  })

  return note;
}

const destroy = async (params) => {
  const findNote = await prisma.notes.findUnique({
    where: {
      id: +params
    }
  })

  if (!findNote) {
    throw { name: "ErrorNotFound", message: "Note not found" }
  }

  const note = await prisma.$transaction([
    prisma.noteTags.deleteMany({
      where: {
        note_id: +params
      },
    }),
    prisma.noteCategories.deleteMany({
      where: {
        note_id: +params
      },
    }),
    prisma.attachments.deleteMany({
      where: {
        note_id: +params
      },
    }),
    prisma.notes.delete({
      where: {
        id: +params
      }
    })
  ])

  return note;
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  destroy
}
