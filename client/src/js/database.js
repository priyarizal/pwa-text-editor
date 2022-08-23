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

// Adding logic to a method that accepts some content and adds it to the database

export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jateDB', 1);
  const jatetext = jateDb.transaction('jate', 'readwrite');
  const store = jatetext.objectStore('jate');
  const request = store.put({ data: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Adding logic for a method that gets all the content from the database

// export const getDb = async () => console.error('getDb not implemented');

export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
