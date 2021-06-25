const { NEXT_PUBLIC_GIT_URL, TOKEN } = require("../../../utils/constants");

const Repos = async (req, res) => {
  const response = await fetch(`${NEXT_PUBLIC_GIT_URL}/user/repos`, {
    method: "GET",
    headers: {
      Authorization: "token " + TOKEN,
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
