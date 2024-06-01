
import { openDB } from 'idb';

// We will define a global constant for our database name so we don't mess it up anywhere
const DB_NAME = "jate"

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/*
  We need to add some code below which will take updated content and save it to IndexedDB.
*/
export const putDb = async (content) => {

  
  const openDataBase = await openDB(DB_NAME, 1);

  // TODO: Now create a variable for the transaction; again, this will be referenced below.
  const transaction = openDataBase.transaction(DB_NAME, 'readwrite');

  // TODO: Now create a variable for the store
  const myStore = transaction.objectStore(DB_NAME);

  const request = myStore.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

export const getDb = async () => {
  const openDataBase = await openDB(DB_NAME, 1);

  const transaction = openDataBase.transaction(DB_NAME, 'readonly');

  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
