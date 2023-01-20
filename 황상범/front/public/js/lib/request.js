const request = axios.create({
  baseURL: "http://127.0.0.1:3001",
  withCredentials: true,
});

export default request;
