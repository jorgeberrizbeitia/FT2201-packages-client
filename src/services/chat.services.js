import axios from "axios"

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/chat`
})

service.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");
  if (storedToken) {
    config.headers = { Authorization: `Bearer ${storedToken}` };
  }
  return config;
});

const getUsersService = () => {
  return service.get("/users")
}

export {
  getUsersService
}