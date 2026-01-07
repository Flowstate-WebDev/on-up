const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.status(200);
  res.send({ "Cukiernikkk": req.params.id });
});

module.exports = router;