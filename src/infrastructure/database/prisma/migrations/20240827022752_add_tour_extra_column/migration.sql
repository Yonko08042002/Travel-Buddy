/*
  Warnings:

  - Added the required column `tour_style_id` to the `tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tour" ADD COLUMN     "tour_style_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "tour_style" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "tour_style_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_destination" (
    "tour_id" UUID NOT NULL,
    "destination_id" UUID NOT NULL,

    CONSTRAINT "tour_destination_destination_id_tour_id_pk" PRIMARY KEY ("destination_id","tour_id")
);

-- AddForeignKey
ALTER TABLE "tour" ADD CONSTRAINT "tour_tour_style_id_fkey" FOREIGN KEY ("tour_style_id") REFERENCES "tour_style"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_destination" ADD CONSTRAINT "tour_destination_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_destination" ADD CONSTRAINT "tour_destination_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
