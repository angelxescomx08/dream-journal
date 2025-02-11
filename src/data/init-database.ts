export function initDatabase() {
  return `
    CREATE TABLE IF NOT EXISTS "users" (
      "user_id" TEXT PRIMARY KEY NOT NULL,
      "name" TEXT NOT NULL,
      "last_name" TEXT NOT NULL,
      "birthday" TIMESTAMP NOT NULL,
      "gender" TEXT NOT NULL CHECK("gender" IN ('male', 'female'))
    );

    CREATE TABLE IF NOT EXISTS "dreams" (
      "dream_id" TEXT PRIMARY KEY NOT NULL,
      "user_id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "content" TEXT NOT NULL,
      "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")
    );

    CREATE TABLE IF NOT EXISTS "tags" (
      "tag_id" TEXT NOT NULL,
      "dream_id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      PRIMARY KEY ("tag_id", "name"),
      FOREIGN KEY ("dream_id") REFERENCES "dreams" ("dream_id")
    );

  `;
}
