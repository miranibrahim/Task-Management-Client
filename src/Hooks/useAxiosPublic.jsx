import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost5000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
