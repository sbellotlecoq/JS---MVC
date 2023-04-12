const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'item.csv';

const getInventoryList = async () => {
  const results = [];
  try {
    const readCSV = fs.createReadStream(csvFilePath).pipe(csv());
    for await (const row of readCSV) {
      results.push(row);
    }
    return results;
  } catch (err) {
    console.error(err);
  }
};

const addItem = async (item) => {
  try {
    const writeStream = fs.createWriteStream(csvFilePath, { flags: 'a' });
    const data = `${item.id},${item.name},${item.price}\n`;
    writeStream.write(data);
    writeStream.end();
    console.log(`Article ajouté : ${item.name}`);
  } catch (err) {
    console.error(err);
  }
};

const updateItem = async (id, name, price) => {
  try {
    const results = [];
    const readCSV = fs.createReadStream(csvFilePath).pipe(csv());
    for await (const row of readCSV) {
      if (row.id === id) {
        row.name = name;
        row.price = price;
      }
      results.push(row);
    }
    const writeStream = fs.createWriteStream(csvFilePath);
    for (const row of results) {
      const data = `${row.id},${row.name},${row.price}\n`;
      writeStream.write(data);
    }
    writeStream.end();
    console.log(`Article ${id} mis à jour : ${name}`);
  } catch (err) {
    console.error(err);
  }
};

const deleteItem = async (id) => {
  try {
    const results = [];
    const readCSV = fs.createReadStream(csvFilePath).pipe(csv());
    for await (const row of readCSV) {
      if (row.id !== id) {
        results.push(row);
      } else {
        console.log(`Article supprimé : ${row.name}`);
      }
    }
    const writeStream = fs.createWriteStream(csvFilePath);
    for (const row of results) {
      const data = `${row.id},${row.name}\n`;
      writeStream.write(data);
    }
    writeStream.end();
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getInventoryList,
  addItem,
  updateItem,
  deleteItem,
};