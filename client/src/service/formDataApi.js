import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken } from '../utils/common-utils';

const API_URL = 'http://localhost:5000';

// Api service with interceptors
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Stop global loader here
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

////////////////////////
// if (success) return {isSuccess: true, data: Object}
// if (!success) return {isFailure: true, status: String, msg: String, code: Int}
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

////////////////////////
// if (success) return {isSuccess: true, data: Object}
// if (!success) return {isFailure: true, status: String, msg: String, code: Int}
const processError = (error) => {
  if (error.response) {
    // Request made and server responded with
    // a status that falls out of range 2xx
    console.log('ERROR IN RESPONSE: ', error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailue,
      code: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response was received
    console.log('ERROR IN NETWORK: ', error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: '',
    };
  } else {
    // Something happened in setting up request triggering an error
    console.log('ERROR IN REQUEST: ', error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailue,
      code: '',
    };
  }
};

const FormData_API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  FormData_API[key] = (body, showUploadProgress, showDwldProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      headers: { 'x-access-token': getAccessToken() },
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDwldProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDwldProgress(percentageCompleted);
        }
      },
    });
}

export { FormData_API };
