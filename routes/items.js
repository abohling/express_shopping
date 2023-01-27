const Item = require("../items");
const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
  try {
    return res.json({ items: Item.returnAll() });
  } catch (err) {
    return next(err);
  }
});

router.post("", (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});

router.get("/:name", (req, res, next) => {
  try {
    let foundItem = Item.findItem(req.params.name);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    let foundItem = Item.update(req.params.name, req.body);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    Item.remove(req.params.name);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
