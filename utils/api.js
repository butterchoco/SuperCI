import { NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_GIT_URL, TOKEN } from "./constants";

const fetchGit = async (url, method, body) => {
  const response = await fetch(NEXT_PUBLIC_GIT_URL + url, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "token " + TOKEN,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      const res = {
        error: JSON.stringify(err),
      };
      return res;
    });
  if (response.errors !== undefined) return { error: JSON.stringify(response) };
  return response;
};

export const getGit = async (url) => {
  const response = await fetchGit(url, "GET", null);
  return response;
};

export const postGit = async (url, body) => {
  const response = await fetchGit(url, "POST", body);
  return response;
};

const fetchBase = async (url, method, body) => {
  const response = await fetch(NEXT_PUBLIC_BASE_URL + url, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "token " + TOKEN,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      const res = {
        error: JSON.stringify(err),
      };
      return res;
    });
  if (response.errors !== undefined) return { error: JSON.stringify(response) };
  return response;
};

export const getBase = async (url) => {
  const response = await fetchBase(url, "GET", null);
  return response;
};

export const postBase = async (url, body) => {
  const response = await fetchBase(url, "POST", body);
  return response;
};
