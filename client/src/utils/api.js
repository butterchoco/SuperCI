const baseUrl = process.env.URL || "http://localhost:8000";
const token = "707f35e44e362069a9fd62e688a12accd80467ae";

export const clientGet = async (path, header) => {
  return new Promise(async (resolve, reject) => {
    try {
      const promise = await fetch(baseUrl + path, {
        method: "GET",
        headers: Object.assign(
          {
            Authorization: "token " + token,
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
      const promise = await fetch(baseUrl + path, {
        method: "POST",
        body,
        headers: Object.assign(
          {
            Authorization: "token " + token,
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
