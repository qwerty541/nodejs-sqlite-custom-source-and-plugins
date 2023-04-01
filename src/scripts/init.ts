import sqlite from "better-sqlite3";

export function run(database: sqlite.Database): void {
    const query = database.prepare(
        "create table if not exists books (id uuid, name varchar(100), author varchar(100))",
    );
    query.run();
}
