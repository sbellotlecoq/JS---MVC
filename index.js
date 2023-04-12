const readline = require('readline');
const controller = require('./controller');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const startApp = () => {
  let exit = false;
  const promptAction = () => {
    console.log('Que souhaitez-vous faire ?');
    console.log('1 - Afficher la liste des articles');
    console.log('2 - Ajouter un article');
    console.log('3 - Mettre à jour un article');
    console.log('4 - Supprimer un article');
    console.log('5 - Quitter l\'application');

    rl.question('Votre choix :', async (action) => {
      switch (action) {
        case '1':
          await controller.showInventoryList();
          promptAction();
          break;
        case '2':
          await controller.addItem();
          promptAction();
          break;
        case '3':
          await controller.updateItem();
          promptAction();
          break;
        case '4':
          await controller.deleteItem();
          promptAction();
          break;
        case '5':
          console.log('Au revoir !');
          rl.close();
          break;
        default:
          console.log('Choix invalide, veuillez réessayer.\n');
          promptAction();
          break;
      }
    });
  };
  promptAction();
};

startApp();