var { exec } = require("child_process");

const RunHooksController = (req, res) => {
  console.log(req.body);
  const { repository, pusher } = req.body;
  const { clone_url } = repository;
  const { username } = pusher;
  //verify that the payload is a push from the correct repo
  //verify repository.name == 'wackcoon-device' or repository.full_name = 'DanielEgan/wackcoon-device'
  // console.log(
  //   req.body.pusher.name + " just pushed to " + req.body.repository.name
  // );

  // console.log("pulling code from GitHub...");

  // // reset any changes that have been made locally
  // exec("git -C ~/projects/wackcoon-device reset --hard", execCallback);

  // // and ditch any files that have been added locally too
  // exec("git -C ~/projects/wackcoon-device clean -df", execCallback);

  // // now pull down the latest
  // exec("git -C ~/projects/wackcoon-device pull -f", execCallback);

  // // and npm install with --production
  // exec("npm -C ~/projects/wackcoon-device install --production", execCallback);

  // // and run tsc
  // exec("tsc", execCallback);
  res.send({ success: "true" });
};

export default RunHooksController;
