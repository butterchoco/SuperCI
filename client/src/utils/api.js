import { BASE_URL, TOKEN } from "./Constants";

export const clientGet = async (path, header) => {
  return new Promise(async (resolve, reject) => {
    try {
      const promise = await fetch(BASE_URL + path, {
        method: "GET",
        headers: Object.assign(
          {
            Authorization: "token " + TOKEN,
          },
          header
        ),
      });
      resolve(await promise.json());
    } catch (e) {
      reject(e);
    }
  });
};

export const clientPost = (path, body, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const promise = await fetch(BASE_URL + path, {
        method: "POST",
        body: JSON.stringify(body),
        headers: Object.assign(
          {
            Authorization: "token " + TOKEN,
            "Content-Type": "application/json",
          },
          header
        ),
      });
      const response = await promise.json();
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};
