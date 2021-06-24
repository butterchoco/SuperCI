const express = require("express");
const CreateHooksController = require("../controller/CreateHooksController");
const RunHooksController = require("../controller/RunHooksController");
const GetRepositoriesController = require("../controller/GetRepositoriesController");
const GetRepositoryController = require("../controller/GetRepositoryController");
const GetHooksController = require("../controller/GetHooksController");
const HomeController = require("../controller/HomeController");

const router = express.Router();

router.get("/", HomeController);
router.get("/user/repos", GetRepositoriesController);
router.get("/repos/:owner/:repo", GetRepositoryController);
router.get("/repos/:owner/:repo/hooks", GetHooksController);
router.post("/repos/:owner/:repo/hooks", CreateHooksController);
router.post("/repos/:owner/:repo/hooks/run", RunHooksController);

module.exports = router;
