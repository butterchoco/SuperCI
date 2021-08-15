import { postGit, getGit } from "../../../../../utils/api";
import { spawn } from "child_process";
import fs from "fs";
import { TOKEN } from "../../../../../utils/constants";

const GetHooksController = async (req, res) => {
  const { owner, repo } = req.query;

  let response;
  if (req.method === "POST") {
    response = await postGit(
      `/repos/${owner}/${repo}/hooks`,
      JSON.stringify(req.body)
    );

    if (response.error) return res.status(400).send(response);

    const dirName = "./data-git";
    if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
    console.log(fs.existsSync(dirName));
    fs.readdir(dirName, (err, files) => {
      if (err)
        return res.status(500).send({ error: "Failed to read directory" });
      if (files.length === 0 || !files.includes(repo)) {
        const splitUrl = process.env.NEXT_PUBLIC_GIT_URL.split("://");
        const protocol = splitUrl[0];
        const host = splitUrl[1];
        const clone = spawn(`git`, [
          `-C`,
          `${dirName}`,
          `clone`,
          "--progress",
          "--verbose",
          `${protocol}://${owner}:${TOKEN}@${host}/${owner}/${repo}.git`,
        ]);
        clone.stderr.on("data", (data) => {
          console.log(data.toString());
        });
        clone.on("exit", function (code) {
          if (fs.existsSync(dirName + "/" + repo)) console.log("Repo Cloned");
          else return res.status(500).send({ error: "Repo cannot be cloned" });
        });
        console.log(files);
      }
    });
  } else {
    response = await getGit(`/repos/${owner}/${repo}/hooks`);
    if (response.error) return res.status(400).send(response);
  }

  res.send(response);
};

export default GetHooksController;
