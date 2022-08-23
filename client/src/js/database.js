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

// export const putDb = async (content) => console.error('putDb not implemented')

export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jateDB', 1);
  const jatetext = jateDb.transaction('jate', 'readwrite');
  const store = jatetext.objectStore('jate');
  const request = store.put({ id: id, todo: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
