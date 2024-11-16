import axios from "axios";


const axiosSecure = axios.create({
  baseURL : 'https://job-quest-server.vercel.app'
});

const useAxios = () => {
  return axiosSecure;
}

export default useAxios;