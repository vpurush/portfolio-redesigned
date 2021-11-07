import PouchDB from "pouchdb-browser";
import PouchDBFind from "pouchdb-find";
import { NotebookType } from "./types/note";

PouchDB.plugin(PouchDBFind);
let dbs: Record<string, PouchDB.Database<unknown>> = {};
let username: string = "";

const getFullDBName = (uname: string, dbName: string) => `${uname}-${dbName}`;

const initializeDB = <T>(
  uname: string,
  dbName: string
): PouchDB.Database<T> | undefined => {
  username = uname;
  if (!username || !username.length) {
    throw new Error("Username is missing");
  }
  if (uname && uname.length) {
    const fullDBName = getFullDBName(uname, dbName);
    if (!!dbs[fullDBName]) {
      console.log("Database has already been instantiated");
    }
    dbs[fullDBName] = new PouchDB(fullDBName);

    return dbs[fullDBName] as PouchDB.Database<T>;
  }
};

const getDb = <T>(dbName: string) => {
  const fullDBName = getFullDBName(username, dbName);
  const db = dbs[fullDBName] as PouchDB.Database<T>;
  if (!db) {
    console.error("Please invoke initializeDB");
    throw new Error("Please invoke initializeDB");
  }
  return db;
};

export const getNoteDB = () => {
  return getDb<NotebookType>("note");
};

export const initializeNoteDB = async (uname: string) => {
  const db = initializeDB<NotebookType>(uname, "note");
  if (db) {
    await db.createIndex({
      index: {
        fields: ["doc_type"],
      },
    });
  }
};
