/*
  Warnings:

  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- Add column with default value
ALTER TABLE "Users" ADD COLUMN "role" "Role" DEFAULT 'USER';

-- Set column as NOT NULL
ALTER TABLE "Users" ALTER COLUMN "role" SET NOT NULL;