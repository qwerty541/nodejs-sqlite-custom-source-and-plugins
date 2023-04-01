import { initDatabase } from "./shared";

async function run(): Promise<void> {
    const database = await initDatabase(true);

    const query = database.prepare("select sqlite_version()");
    const result = query.get();
    console.log(result);

    database.close();
}

run().catch((e) => console.error(e));
