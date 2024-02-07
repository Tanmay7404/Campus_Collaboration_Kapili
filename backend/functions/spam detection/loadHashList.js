const fs = require('fs').promises;

async function loadHashList() {
  try {
    const data = await fs.readFile('my_dict.json', 'utf8');
    const obj = JSON.parse(data);
    // Update hashlist within the async function scope
    let list = Object.values(obj);
    return list;
  } catch (error) {
    console.error('Error loading or parsing the JSON:', error);
    return []; // Return an empty array or handle as appropriate
  }
}

module.exports = loadHashList;