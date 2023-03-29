import { initDatabase, loadDatabaseExtensions } from "./shared";

async function run(): Promise<void> {
    const database = initDatabase(true);
    await loadDatabaseExtensions(database);

    const query = database.prepare("select * from books");

    for (const book of query.iterate()) {
        console.log(`(${book.id}, ${book.name}, ${book.author})`);
    }

    database.close();
}

run().catch((e) => console.error(e));
