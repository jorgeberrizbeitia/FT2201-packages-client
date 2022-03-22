import axios from "axios"

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/profile`
})

service.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");
  if (storedToken) {
    config.headers = { Authorization: `Bearer ${storedToken}` };
  }
  return config;
});

const getProfileService = () => {
  return service.get("/")
}

export {
  getProfileService
}