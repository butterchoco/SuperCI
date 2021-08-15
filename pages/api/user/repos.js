import { getGit } from "../../../utils/api";

const { NEXT_PUBLIC_GIT_URL, TOKEN } = require("../../../utils/constants");

const Repos = async (req, res) => {
  const response = await getGit("/user/repos");
  if (response.error) return res.status(400).send(response);
  console.log(response);
  res.send(response);
};

export default Repos;
