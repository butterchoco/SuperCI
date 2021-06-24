const { BASE_URL } = require("../Constants");
const fetch = require("node-fetch");

const UUID = () => {
  let S4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  let guid = `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;

  return guid.toLowerCase();
};

const fetchGet = async (path, headers = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const promise = await fetch(BASE_URL + "/api/v1" + path, {
        method: "GET",
        headers,
      });
      resolve(await promise.json());
    } catch (e) {
      reject(e);
    }
  });
};

const fetchPost = (path, body, headers = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const promise = await fetch(BASE_URL + "/api/v1" + path, {
        method: "POST",
        body: JSON.stringify(body),
        headers: Object.assign({ "Content-Type": "application/json" }, headers),
      });
      const response = await promise.json();
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  UUID,
  fetchGet,
  fetchPost,
};
