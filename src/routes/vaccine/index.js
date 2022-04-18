const express = require("express");
const router = express.Router();
const {
	retrieveVaccines,
	create,
	retrieveVaccineById,
	update,
	destroy,
} = require("src/controllers/vaccine");

router.get("/", retrieveVaccines);
router.post("/", create);
router.get("/:id", retrieveVaccineById);
router.patch("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
