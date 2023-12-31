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

const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const result = await store.add({ content });
    console.log('Data added to the database with key:', result);
  } catch (error) {
    console.error('Error adding data to the database:', error);
  }
};

const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const data = await store.getAll();
    console.log('Data retrieved from the database:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
  }
};

initdb(); // Initialize the database when the module is loaded

export { putDb, getDb };
