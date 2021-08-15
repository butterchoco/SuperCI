import { postGit, getGit } from "../../../../../utils/api";
import { exec } from "child_process";

const GetHooksController = async (req, res) => {
  const { owner, repo } = req.query;

  let response;
  if (req.method === "POST") {
    response = await postGit(
      `/repos/${owner}/${repo}/hooks`,
      JSON.stringify(req.body)
    );

    if (response.error) return res.status(400).send(response);
    else {
      exec(
        `git -C ./data/git clone ${process.env.NEXT_PUBLIC_GIT_URL}/${owner}/${repo}.git`
      );
    }
  } else {
    response = await getGit(`/repos/${owner}/${repo}/hooks`);
    if (response.error) return res.status(400).send(response);
  }

  res.send(response);
};

export default GetHooksController;
