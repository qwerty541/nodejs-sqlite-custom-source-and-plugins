import sqlite from "better-sqlite3";

export function run(database: sqlite.Database): void {
    const query = database.prepare("insert into books (id, name, author) values (uuid(), ?, ?)");
    query.run("Harry Potter and the Philosopher's Stone", "J. K. Rowling");
    query.run("The Lord of the Rings", "J. R. R. Tolkien");
}
