const express = require("express");
const router = express.Router();
const {
  index,
  create,
  retrieveVaccineById,
  update,
} = require("src/controllers/vaccine");

router.get("/", index);
router.post("/", create);
router.get("/:id", retrieveVaccineById);
router.patch("/:id", update);
// router.delete("/:id", '');

module.exports = router;
