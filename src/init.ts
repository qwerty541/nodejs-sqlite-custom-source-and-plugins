import { initDatabase } from "./shared";

async function run(): Promise<void> {
    const database = await initDatabase(false);

    const query = database.prepare(
        "create table if not exists books (id uuid, name varchar(100), author varchar(100))",
    );
    query.run();

    database.close();
}

run().catch((e) => console.error(e));
