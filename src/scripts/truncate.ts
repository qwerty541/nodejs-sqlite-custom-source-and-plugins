import sqlite from "better-sqlite3";

export function run(database: sqlite.Database): void {
    const query = database.prepare("delete from books");
    query.run();
}
