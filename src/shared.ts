import sqlite from "better-sqlite3";
import fs from "fs";
import path from "path";
import console from "console";

const BUFFER_ENCODING: BufferEncoding = "utf-8";
const DATABASE_FILE_PATH: fs.PathLike = "./database.db";
const SQLITE_PLUGINS_FOLDER_PATH: fs.PathLike = "./plugins";
const SQLITE_NODE_ADDON_FILE_PATH: fs.PathLike = "./build/Release/better_sqlite3.node";

export enum AvailableScripts {
    Init = "init",
    Insert = "insert",
    Select = "select",
    Truncate = "truncate",
    Version = "version",
}

export function displayWhichScriptCurrentlyRunning(script: AvailableScripts): void {
    console.log(`Running ${script} script.`);
}

export async function initDatabase(
    fileMustExist: boolean,
    databaseFilePath: string = DATABASE_FILE_PATH.toString(),
    nativeBinding: string = SQLITE_NODE_ADDON_FILE_PATH.toString(),
    pluginsFolderPath: string = SQLITE_PLUGINS_FOLDER_PATH.toString(),
): Promise<sqlite.Database> {
    const database = new sqlite(databaseFilePath, {
        fileMustExist,
        verbose: console.log,
        nativeBinding,
    });
    console.log("Database was successfully initialized.");
    await loadDatabaseExtensions(database, pluginsFolderPath);
    return database;
}

async function loadDatabaseExtensions(
    database: sqlite.Database,
    pluginsFolderPath: string,
): Promise<void> {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const plugins = fs.readdirSync(pluginsFolderPath, BUFFER_ENCODING);

    while (!database.open) {
        console.log("Database is not opened yet, starting delay...");
        await delay(100);
    }

    for (const plugin of plugins) {
        const pluginPath = path.join(pluginsFolderPath, plugin);
        const extension = path.extname(pluginPath);

        if (extension === ".so") {
            database.loadExtension(pluginPath);
            console.log(`Extension ${pluginPath} was successfully loaded.`);
        }
    }
}
