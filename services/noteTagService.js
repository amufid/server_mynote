const prisma = require('../lib/prisma')

const create = async (params) => {
  const noteTag = await prisma.noteTags.create({
    data: {
      note_id: params.note_id,
      tag_id: params.tag_id
    }
  })

  return noteTag;
}

const update = async (params) => {
  const findNoteTag = await prisma.noteTags.findUnique({
    where: {
      id: +params.id
    }
  })

  if (!findNoteTag) {
    throw { name: 'ErrorNotFound', message: 'NoteTag not found' }
  }

  const { note_id, tag_id } = params.body

  const noteTag = await prisma.noteTags.update({
    where: {
      id: +params.id
    },
    data: {
      note_id: note_id,
      tag_id: tag_id
    }
  })

  return noteTag;
}

module.exports = {
  create,
  update
}
