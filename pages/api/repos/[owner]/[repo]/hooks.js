import { NEXT_PUBLIC_GIT_URL, TOKEN } from "../../../../../utils/constants";

const GetHooksController = async (req, res) => {
  const { owner, repo } = req.query;

  let response;
  if (req.method === "POST") {
    console.log("POST");
    response = await fetch(
      `${NEXT_PUBLIC_GIT_URL}/repos/${owner}/${repo}/hooks`,
      {
        method: "GET",
        body: JSON.stringify(req.body),
        headers: {
          Authorization: "token " + TOKEN,
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

    if (response.message) return res.status(400).json(response);

    exec(
      `git -C /data/git clone ${process.env.NEXT_PUBLIC_GIT_URL}/${owner}/${repo}.git`,
      execCallback
    );
  } else {
    response = await fetch(
      `${NEXT_PUBLIC_GIT_URL}/repos/${owner}/${repo}/hooks`,
      {
        method: "GET",
        headers: {
          Authorization: "token " + TOKEN,
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

    if (response.message) return res.status(400).json(response);
  }

  res.send(response);
};

export default GetHooksController;
