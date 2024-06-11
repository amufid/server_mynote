const prisma = require('../lib/prisma')

const findAll = async (params) => {
  const attachments = await prisma.attachments.findMany()
  return attachments;
}

const findOne = async (params) => {
  const attachment = await prisma.attachments.findUnique({
    where: {
      id: +params
    }
  })

  if (!attachment) {
    throw { name: "ErrorNotFound", message: "Attachment not found" }
  }

  return attachment;
}

const create = async (params) => {
  if (!params.file) {
    throw { name: "ErrorNotFound", message: "file_path is missing in params" }
  }

  const attachment = await prisma.attachments.create({
    data: {
      note_id: +params.body.note_id,
      file_path: params.file.path
    }
  })

  return attachment;
}

const update = async (params) => {

}

const destroy = async (params) => {
  const findAttachment = await prisma.attachments.findUnique({
    where: {
      id: +params
    }
  })

  if (!findAttachment) {
    throw { name: "ErrorNotFound", message: "Attachment not found" }
  }

  const attachment = await prisma.attachments.delete({
    where: {
      id: +params
    }
  })

  return attachment;
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
}
