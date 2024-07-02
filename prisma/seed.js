const prisma = require('../lib/prisma')

async function main() {
   const notes = await prisma.notes.createMany({
      data: [
         {
            "user_id": 1,
            "title": "Junior Executive",
            "content": "unleash transparent web-readiness"
         },
         {
            "user_id": 1,
            "title": "VP Quality Control",
            "content": "synthesize revolutionary systems"
         }
      ]
   })
   console.log('seeding success')
}
main()
   .then(async () => {
      await prisma.$disconnect()
   })
   .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
   })