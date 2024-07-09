const prisma = require('../lib/prisma')

const findAll = async (params) => {
  let { search, createdAt, updatedAt, isPinned } = params.query
  let searchFilter = {}
  let createdAtFilter = {}
  let updateAtFilter = {}
  let pinnedFilter = {}

  if (search) {
    searchFilter = {
      title: {
        equals: `%${search}%`,
        mode: 'insensitive'
      }
    }
  }

  if (isPinned) {
    pinnedFilter = {
      isPinned: true
    }
  }

  if (createdAt) {
    createdAtFilter = {
      created_at: `${createdAt}`
    }
  }

  if (updatedAt) {
    createdAtFilter = {
      updated_at: `${updatedAt}`
    }
  }

  const filterOptions = {
    orderBy: [
      {
        ...createdAtFilter,
        ...updateAtFilter,
      }
    ],
  }

  const notes = await prisma.notes.findMany({
    where: {
      ...searchFilter,
      ...pinnedFilter,
      user_id: params.id,
      deletedAt: null,
    },
    ...filterOptions,
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
  const { id, user_id } = params
  const note = await prisma.notes.findFirst({
    where: {
      id: +id,
      user_id: +user_id
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
  const imageUrl = params.path

  if (!title || !content) {
    throw { name: 'ErrorBadRequest', message: 'Title and content is required' }
  }

  if (!tag_id && !category_id && !imageUrl) {
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

  let lastIdNote = 0

  if (findLastId.length >= 1) {
    lastIdNote = findLastId[0].id
  } else {
    lastIdNote = 0
  }

  if (imageUrl && !tag_id && !category_id) {
    const note = await prisma.$transaction([
      prisma.notes.create({
        data: {
          user_id: params.id,
          title: title,
          content: content
        },
      }),
      prisma.attachments.create({
        data: {
          note_id: lastIdNote + 1,
          file_path: imageUrl.secure_url
        },
      }),
    ])

    return note;
  }

  const findTag = await prisma.tags.findUnique({
    where: {
      id: +tag_id
    }
  })

  if (tag_id && !category_id && !imageUrl) {

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
          note_id: lastIdNote + 1,
          tag_id: findTag.id
        },
      }),
    ])

    return note;
  }

  if (imageUrl && tag_id && !category_id) {
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
          note_id: lastIdNote + 1,
          tag_id: findTag.id
        },
      }),
      prisma.attachments.create({
        data: {
          note_id: lastIdNote + 1,
          file_path: imageUrl.secure_url
        }
      }),
    ]);

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

  if (category_id && !tag_id && !imageUrl) {
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
          note_id: lastIdNote + 1,
          category_id: findCategory.id
        },
      }),
    ])

    return note;
  }

  if (imageUrl && category_id && !tag_id) {
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
          note_id: lastIdNote + 1,
          category_id: findCategory.id
        },
      }),
      prisma.attachments.create({
        data: {
          note_id: lastIdNote + 1,
          file_path: imageUrl.secure_url
        }
      }),
    ]);

    return note;
  }
  console.log(lastIdNote, '<<<<<<<<<')
  if (!imageUrl && category_id && tag_id) {
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
          note_id: lastIdNote + 1,
          category_id: findCategory.id
        },
      }),
      prisma.noteTags.create({
        data: {
          note_id: lastIdNote + 1,
          tag_id: findTag.id
        },
      }),
    ]);

    return note;
  }

  if (!imageUrl && category_id && tag_id) {
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
          note_id: lastIdNote + 1,
          category_id: findCategory.id
        },
      }),
      prisma.noteTags.create({
        data: {
          note_id: lastIdNote + 1,
          tag_id: findTag.id
        },
      }),
    ]);

    return note;
  }

  // membuat data baru dari beberapa table secara bersamaan dengan $transaction
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
        note_id: lastIdNote + 1,
        tag_id: findTag.id
      },
    }),
    prisma.noteCategories.create({
      data: {
        note_id: lastIdNote + 1,
        category_id: findCategory.id
      },
    }),
    prisma.attachments.create({
      data: {
        note_id: lastIdNote + 1,
        file_path: imageUrl.secure_url
      }
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
    prisma.notes.update({
      where: {
        id: +params
      },
      data: {
        deletedAt: new Date()
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
