-- DropForeignKey
ALTER TABLE "Attachments" DROP CONSTRAINT "Attachments_note_id_fkey";

-- DropForeignKey
ALTER TABLE "NoteCategories" DROP CONSTRAINT "NoteCategories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "NoteCategories" DROP CONSTRAINT "NoteCategories_note_id_fkey";

-- DropForeignKey
ALTER TABLE "NoteTags" DROP CONSTRAINT "NoteTags_note_id_fkey";

-- DropForeignKey
ALTER TABLE "NoteTags" DROP CONSTRAINT "NoteTags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteTags" ADD CONSTRAINT "NoteTags_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "Notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteTags" ADD CONSTRAINT "NoteTags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCategories" ADD CONSTRAINT "NoteCategories_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "Notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteCategories" ADD CONSTRAINT "NoteCategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachments" ADD CONSTRAINT "Attachments_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "Notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
