const { NEXT_PUBLIC_GIT_URL } = require("../../../utils/constants");

const Repos = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Not Authorize" });

  console.log(token);
  const response = await fetch(`${NEXT_PUBLIC_GIT_URL}/user/repos`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => err);

  res.send(response);
};

export default Repos;
