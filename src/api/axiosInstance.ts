/*
 * File: axiosInstance.ts
 * Programmer: Jacob Atienza
 * Date: 02/27/2025
 * Description:
 * This file contains the Axios instance that is used to make API calls to the Open Trivia Database.
 * The Axios instance is pre-configured with the base URL and headers for the API.
 */

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://opentdb.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
