const express = require("express");
const CreateHooksController = require("../controller/CreateHooksController");
const RunHooksController = require("../controller/RunHooksController");
const GetRepositoriesController = require("../controller/GetRepositoriesController");
const GetHooksController = require("../controller/GetHooksController");
const HomeController = require("../controller/HomeController");

const router = express.Router();

router.get("/", HomeController);
router.get("/user/repos", GetRepositoriesController);
router.get("/repos/:owner/:repo/hooks", GetHooksController);
router.get("/:repo/hooks", CreateHooksController);
router.post("/:repo/hooks/:id", RunHooksController);

module.exports = router;
