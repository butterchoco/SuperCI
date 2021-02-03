const example = (handle, response) => {
  handle.write(response);
  handle.end();
};

module.exports = example;
