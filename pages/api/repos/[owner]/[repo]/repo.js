const { NEXT_PUBLIC_GIT_URL } = require("../../../../../utils/constants");

const GetRepositoryController = async (req, res) => {
  const { owner, repo } = req.params;

  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Not Authorize" });

  const response = await fetch(
    `${NEXT_PUBLIC_GIT_URL}/repos/${owner}/${repo}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => err);

  res.send(response);
};

export default GetRepositoryController;
