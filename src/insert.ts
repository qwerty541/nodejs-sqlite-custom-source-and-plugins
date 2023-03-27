import { initDatabase, loadDatabaseExtensions } from "./shared";

async function run(): Promise<void> {
    const database = initDatabase(true);
    await loadDatabaseExtensions(database);

    const query = database.prepare("insert into books (id, name, author) values (uuid(), ?, ?)");
    query.run("Harry Potter and the Philosopher's Stone", "J. K. Rowling");
    query.run("The Lord of the Rings", "J. R. R. Tolkien");

    database.close();
}

run().catch((e) => console.error(e));
