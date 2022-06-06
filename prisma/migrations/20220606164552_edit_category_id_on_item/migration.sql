-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_id_fkey";

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
