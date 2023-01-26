const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }
  static returnAll() {
    return items;
  }
  static findItem(name) {
    let foundItem = items.find((i) => i.name === name);
    if (foundItem === undefined) {
      throw { message: "not found", status: 404 };
    }
    return foundItem;
  }
  static update(name, data) {
    let foundItem = Item.findItem(name);
    if (foundItem === undefined) {
      throw { message: "not found", status: 404 };
    }
    foundItem.name = data.name;
    foundItem.price = data.price;
    return foundItem;
  }
}

module.exports = Item;

// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
