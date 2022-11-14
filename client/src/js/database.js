import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const textDb = await openDB('text', 1); // set up text database
  const tx = textDb.transaction('text', 'readwrite'); // set database to read/write
  const store = tx.objectStore('text'); // create text object store
  const request = store.add({ text: content }); // stores content of the request
  const result = await request;
  console.log("Text saved!")
  return result
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const textDb = await openDB('text', 1); // get database
  const tx = textDb.transaction('text', 'readonly'); // set text data to read only
  const store = tx.objectStore('text'); // set store to object store of text
  const request = store.getAll(); // get all data from the store
  const result = await request;
  console.log("Text retrieved!")
  return result;
};

initdb();
