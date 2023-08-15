import axios from "axios";

const restRoom = axios.create({
  baseURL: 'https://9oj5llcb96.execute-api.us-west-2.amazonaws.com/dev',
  timeout: 40000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

export default restRoom;