import { getGit } from "../../../../../utils/api";

const GetRepositoryController = async (req, res) => {
  const { owner, repo } = req.query;

  const response = await getGit(`/repos/${owner}/${repo}`);
  if (response.error) return res.status(400).json(response);
  console.log(response);
  res.send(response);
};

export default GetRepositoryController;
