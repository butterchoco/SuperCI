const Example = (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  return req.on("end", () => {
    const response = Buffer.concat(body).toString();
    const {} = JSON.parse(response);

    res.end();
  });
};

module.exports = example;
