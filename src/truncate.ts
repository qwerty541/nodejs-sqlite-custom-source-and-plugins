import { initDatabase, loadDatabaseExtensions } from "./shared";

async function run(): Promise<void> {
    const database = initDatabase(false);
    await loadDatabaseExtensions(database);

    const query = database.prepare("delete from books");
    query.run();

    database.close();
}

run().catch((e) => console.error(e));
