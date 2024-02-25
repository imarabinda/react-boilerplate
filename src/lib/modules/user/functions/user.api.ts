import endpoints from "config/endpoints.config";
import request from "request";
import { UserData } from "../types/user";

export type CurrentUserProfileResponse = BaseApiResponseType & {
  data: UserData;
};
export const getCurrentUserProfile = () => {
  return request.get<CurrentUserProfileResponse>(endpoints.user.profile);
};

export type ForgetPasswordMutationParams = {};
export type ForgetPasswordMutationResponse = BaseApiResponseType & {};
export const forgetPasswordMutation = (
  params: ForgetPasswordMutationParams
) => {
  return request.post<ForgetPasswordMutationResponse>(
    endpoints.auth.forgetPassword,
    params
  );
};
export type LogInMutationParams = {};
export type LogInMutationResponse = BaseApiResponseType & {
  data: {
    token: string;
    user: UserData;
  };
};
export const loginMutation = (params: LogInMutationParams) => {
  return request.post<LogInMutationResponse>(endpoints.auth.login, params);
};

export type SignupMutationParams = {};
export type SignupMutationResponse = BaseApiResponseType & {};
export const signUpMutation = (params: SignupMutationParams) => {
  return request.post<SignupMutationResponse>(endpoints.auth.signUp, params);
};

export type LogoutMutationResponse = BaseApiResponseType & {};
export const logoutMutation = () => {
  return request.post<LogoutMutationResponse>(endpoints.auth.logout);
};
