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
  const textDb = await openDB('jate', 1); // set up text database
  const tx = textDb.transaction('jate', 'readwrite'); // set database to read/write
  const store = tx.objectStore('jate'); // create text object store
  const request = store.put({ text: content }); // stores content of the request
  const result = await request;
  console.log("Text saved!")
  return result
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const textDb = await openDB('jate', 1); // get database
  const tx = textDb.transaction('jate', 'readonly'); // set text data to read only
  const store = tx.objectStore('jate'); // set store to object store of text
  const request = await store.get(1); // get all data from the store
  const result = request;
  console.log("Text retrieved!")
  console.log(result)
  return result.value;
};

initdb();
