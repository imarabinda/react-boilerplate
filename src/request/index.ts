import { globalCatchError, isInServer } from "lib/helpers/common.helper";
import eventEmitter from "service/EventEmitter/eventEmitter";
import axios, { AxiosError } from "axios";
import events from "config/events.config";
import { getAxiosAccessToken } from "lib/helpers/axios/axios.helper";
import endpoints from "config/endpoints.config";
import { baseApiUrl } from "config/api.config";

/* This code is creating an instance of the Axios library with a base URL for API requests and adding
interceptors to handle requests and responses. The `request.interceptors.request.use` interceptor
adds an access token to the request headers if it exists. The `request.interceptors.response.use`
interceptor handles errors, specifically if the response status is 401 (unauthorized), it checks if
the request URL is in a list of exceptional API routes that do not require authorization. If it is
not in the list, it emits an event to logout the current user and clear the session. If the code is
running on the server, it dispatches a logout action and sets a redirect to the login page with a
cleared session cookie. Finally, the code exports the instance of Axios with the interceptors added. */

const request = axios.create({
  baseURL: baseApiUrl,
});

const unauthorizeAccessAutoClearExceptionalApiRoutes = Object.values(
  endpoints.auth
);

request.interceptors.request.use((config) => {
  const accessToken = getAxiosAccessToken();
  if (accessToken) {
    config.headers["x-access-token"] =
      config?.headers?.["x-access-token"] || `${accessToken}`;
  }
  return config;
});

request.interceptors.response.use(
  (res) => res.data,
  (error: AxiosError<BaseApiResponseType>) => {
    const pathMatcher = (path: string) =>
      error.response?.config?.url?.includes(path);

    globalCatchError(error);

    if (
      error.response?.status === 401 &&
      !unauthorizeAccessAutoClearExceptionalApiRoutes.some(pathMatcher)
    ) {
      if (!isInServer()) {
        eventEmitter.emit(events.auth.logoutCurrentUser, {
          message: "Session expired",
          excludeApiCall: true,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default request;
