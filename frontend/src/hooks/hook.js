import axios from "axios";

export const updateDBPost = async (payload,route, token) => {
  try {
    console.log(payload)
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/${route}`,
      payload,
      {
        headers: {
          "Content-Type": "text/plain",
        },
        auth:token
      }
    );
    if (res.status >= 200 && res.status < 400) {
      return res.data;
    }

    throw res.data.error;
  } catch (err) {
    throw err?.response?.data?.error || err;
  }
};

export const updateDbGet = async (token, userRole, adminTask) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}?token=${token}`);
  console.log(res);
  if (res.status >= 200 && res.status < 400) {
    return res.data;
  }

  throw res.data.error;
};