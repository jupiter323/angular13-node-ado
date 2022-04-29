module.exports = app => {
  const items = require("../controllers/items.controller.js");

  var router = require("express").Router();


  // Retrieve all Items
  router.get("/", items.findAll);

  // Retrieve a single Item with id
  router.get("/:id", items.findOne);

  // Update a Item with id
  router.put("/:id", items.update);

  app.use('/api/workitems', router);
};
