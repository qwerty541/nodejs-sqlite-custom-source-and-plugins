import sqlite from "better-sqlite3";

export function run(database: sqlite.Database): void {
    const query = database.prepare("select * from books");
    for (const book of query.iterate()) {
        console.log(`(${book.id}, ${book.name}, ${book.author})`);
    }
}
