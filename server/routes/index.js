const express = require("express");
const ActivationController = require("../controller/ActivationController");
const HomeController = require("../controller/HomeController");

const router = express.Router();

router.get("/", HomeController);
router.post("/activation", ActivationController);

module.exports = router;
