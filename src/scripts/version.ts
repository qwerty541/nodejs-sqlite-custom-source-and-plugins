import sqlite from "better-sqlite3";

export function run(database: sqlite.Database): void {
    const query = database.prepare("select sqlite_version()");
    const result = query.get();
    console.log(result);
}
