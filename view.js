const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const prompt = (message) => {
  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      resolve(answer);
    });
  });
};

const showInventoryList = async (items) => {
  console.log('Voici la liste de vos articles :');
  console.table(items);
};

const promptItemData = async () => {
  const id = await prompt('Entrez l\'ID de l\'article : ');
  const name = await prompt('Entrez le nom de l\'article : ');
  const price = await prompt('Entrez le prix de l\'article : ');
  return { id, name, price };
};

const promptItemId = async () => {
  const id = await prompt('Entrez l\'ID de l\'article à modifier/supprimer : ');
  return id;
};

module.exports = {
  showInventoryList,
  promptItemData,
  promptItemId,
};
