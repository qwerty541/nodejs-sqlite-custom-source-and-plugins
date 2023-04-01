import { initDatabase, AvailableScripts, displayWhichScriptCurrentlyRunning } from "./shared";
import process from "process";
import { run as initRunner } from "./scripts/init";
import { run as insertRunner } from "./scripts/insert";
import { run as selectRunner } from "./scripts/select";
import { run as truncateRunner } from "./scripts/truncate";
import { run as versionRunner } from "./scripts/version";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SCRIPT: string | undefined;
        }
    }
}

async function run(): Promise<void> {
    if (!process.env.SCRIPT) {
        throw new Error("Script name should be provided.");
    }

    const database = await initDatabase(!(process.env.SCRIPT === AvailableScripts.Init));

    if (process.env.SCRIPT === AvailableScripts.Init) {
        displayWhichScriptCurrentlyRunning(process.env.SCRIPT);
        initRunner(database);
    } else if (process.env.SCRIPT === AvailableScripts.Insert) {
        displayWhichScriptCurrentlyRunning(process.env.SCRIPT);
        insertRunner(database);
    } else if (process.env.SCRIPT === AvailableScripts.Select) {
        displayWhichScriptCurrentlyRunning(process.env.SCRIPT);
        selectRunner(database);
    } else if (process.env.SCRIPT === AvailableScripts.Truncate) {
        displayWhichScriptCurrentlyRunning(process.env.SCRIPT);
        truncateRunner(database);
    } else if (process.env.SCRIPT === AvailableScripts.Version) {
        displayWhichScriptCurrentlyRunning(process.env.SCRIPT);
        versionRunner(database);
    } else {
        throw new Error("There are no script with provided name.");
    }

    database.close();
}

run().catch((e) => console.error(e));
