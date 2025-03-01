import db from "./db.js"
import fs from "fs";
import path from "path";

async function initDB() {
  try {
    console.log("Running migrations...");
    const migrationPath = path.join(process.cwd(), "db", "migrations")
    const migrationFiles = fs.readdirSync(migrationPath);
    for (const file of migrationFiles) {
      const filePath = path.join(migrationPath, file);
      // Ensure it's a file and has a .sql extension
      await executeSQL(filePath, file)
    }

    console.log("Running seed data...");
    const seedPath = path.join(process.cwd(), "db", "seeds")
    const seedFiles = fs.readdirSync(seedPath);
    for (const file of seedFiles) {
      const filePath = path.join(seedPath, file);
      // Ensure it's a file and has a .sql extension
      await executeSQL(filePath, file)
    }

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error during database initialization:", error);
    process.exit(1); // Exit process with failure
  }
}

async function executeSQL(filePath, file) {
  if (fs.statSync(filePath).isFile() && file.endsWith(".sql")) {
    const sql = fs.readFileSync(filePath, "utf-8");
    const statements = sql.split(";").map(s => s.trim()).filter(s => s.length);
    for (const statement of statements) {
      await db.execute(statement);
    }
  }
}

export default initDB
