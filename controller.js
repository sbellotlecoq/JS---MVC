const model = require('./model');
const view = require('./view');

const showInventoryList = async () => {
  const inventoryList = await model.getInventoryList();
  view.showInventoryList(inventoryList);
};

const addItem = async () => {
  const itemData = await view.promptItemData();
  await model.addItem(itemData);
};

const updateItem = async () => {
  const id = await view.promptItemId();
  const name = await view.promptItemData();
  const price = await view.promptItemData();
  await model.updateItem(id, name, price);
};

const deleteItem = async () => {
  const id = await view.promptItemId();
  await model.deleteItem(id);
};

module.exports = {
  showInventoryList,
  addItem,
  updateItem,
  deleteItem,
};
