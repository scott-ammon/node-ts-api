import axios from "axios";
import endpoints from "./endpoints";

const env = endpoints.baseUrl.dev;

const axiosHelper = (serviceName: string, method: any, url: any, data?: any) => {
  return axios({
    data,
    method,
    url,
    headers: createHeaders(),
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
        error: createErrorResponse(serviceName, error)
      };
    });
};

const createHeaders = () => {
  // Extend this func to create custom headers
  return {
    "Accept-Language": "en-US",
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Sample Node-TypeScript API"
  };
};

const createErrorResponse = (serviceName: string, error: any) => {
  return `${serviceName}: ${error.response.status} - ${error.response.statusText}`;
};

export const getSomeExternalData = (param: string) => {
  const url = env + endpoints.sampleEndpoint + param;
  return axiosHelper("Some external service", "GET", url);
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
