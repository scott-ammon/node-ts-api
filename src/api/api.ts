import axios from "axios";
import endpoints from "./endpoints";

const env = endpoints.baseUrl.dev;

const axiosHelper = (serviceName: string, method: any, url: any, data?: any) => {
  return axios({
    data,
    method,
    url,
  })
    .then((response: any) => {
      return {
        response: response.data,
        error: null
      };
    })
    .catch((error: any) => {
      return {
        response: null,
        error: errorResponse(serviceName, error)
      };
    });
};

const errorResponse = (serviceName: string, error: any) => {
  return `${serviceName}: ${error.response.status} - ${error.response.statusText}`;
};

export const getSomeExternalData = (param: string) => {
  const url = env + endpoints.sampleEndpoint + param;
  return axiosHelper("Sample API", "GET", url);
};

export const postSomeExternalData = (data: string) => {
  const url = env + endpoints.sampleEndpoint;
  const requestBody = {
    someKey: {
      someSubKey: "VALUE"
    }
  };
  return axiosHelper("Sample API", "POST", url, requestBody);
};
