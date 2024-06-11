const prisma = require('../lib/prisma')

const create = async (params) => {
  const noteCategory = await prisma.noteCategories.create({
    data: params
  })

  return noteCategory;
}

const update = async (params) => {
  const findNoteCategory = await prisma.noteCategories.findUnique({
    where: {
      id: +params.id
    }
  })

  if (!findNoteCategory) {
    throw { name: 'ErrorNotFound', message: 'NoteCategory not found' }
  }

  const { note_id, category_id } = params.body

  const noteCategory = await prisma.noteCategories.update({
    where: {
      id: +params.id
    },
    data: {
      note_id: note_id,
      category_id: category_id
    }
  })

  return noteCategory;
}

module.exports = { create, update }
