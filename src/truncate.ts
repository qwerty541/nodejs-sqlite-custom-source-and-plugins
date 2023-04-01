import { initDatabase } from "./shared";

async function run(): Promise<void> {
    const database = await initDatabase(true);

    const query = database.prepare("delete from books");
    query.run();

    database.close();
}

run().catch((e) => console.error(e));
