import useAppDispatch from "lib/hooks/redux/useAppDispatch";
import useAppSelector from "lib/hooks/redux/useAppSelector";
import { useEffect } from "react";
import { logoutUser, setAccessToken, setUserData } from "../redux/user.slice";
import { setAxiosAccessToken } from "lib/helpers/axios/axios.helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CurrentUserProfileResponse,
  ForgetPasswordMutationParams,
  ForgetPasswordMutationResponse,
  LogInMutationParams,
  LogInMutationResponse,
  forgetPasswordMutation,
  getCurrentUserProfile,
  loginMutation,
  logoutMutation,
} from "../functions/user.api";
import eventEmitter from "service/EventEmitter/eventEmitter";
import events from "config/events.config";
import { successErrorNotification } from "lib/helpers/common.helper";
import { useMemoizedFn } from "ahooks";
import { LogOutCurrentUserEventPassData } from "service/EventEmitter/@types/dataTypes/eventEmitter.dataTypes";
import useToast from "lib/hooks/toast/useToast";

export type useAuthProviderValueProps = {};
export default function useAuthProviderValue(
  _props: useAuthProviderValueProps
) {
  const userSlice = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const { enqueueToast } = useToast();

  const updateUserData = useMemoizedFn(
    (response: CurrentUserProfileResponse["data"]) => {
      dispatch(setUserData(response));
    }
  );

  useEffect(() => {
    setAxiosAccessToken(userSlice?.accessToken);
  }, [userSlice?.accessToken]);

  const userQuery = useQuery({
    queryFn: getCurrentUserProfile,
    queryKey: ["currentUser"],
    enabled: Boolean(userSlice?.accessToken),
  });

  const initiateUserLoginState = useMemoizedFn(
    (response: LogInMutationResponse["data"]) => {
      //SET ACCESS TOKEN ALWAYS NEEDS TO BE IN FIRST
      dispatch(setAccessToken(response.token));
      updateUserData(response.user);
    }
  );

  //login user
  const onLoginSuccess = useMemoizedFn((response: LogInMutationResponse) => {
    initiateUserLoginState(response.data);
    successErrorNotification(response);
    eventEmitter.emit(events.auth.loggedIn);
  });

  const loginMutationData = useMutation({
    mutationFn: loginMutation,
    onSuccess: onLoginSuccess,
  });

  const login = useMemoizedFn(async (params: LogInMutationParams) => {
    return loginMutationData.mutateAsync(params);
  });

  //logout user
  const onLogoutSuccess = useMemoizedFn(
    (options?: LogOutCurrentUserEventPassData) => {
      dispatch(logoutUser());
      if (!options?.excludeSuccessNotification) {
        enqueueToast(options?.message || "Logout successful", {
          variant: "success",
        });
      }
      eventEmitter.emit(events.auth.loggedOut);
    }
  );

  const logoutMutationData = useMutation({
    mutationFn: logoutMutation,
    onSettled: () => onLogoutSuccess(),
    retry: false,
  });

  const logout = useMemoizedFn((options?: LogOutCurrentUserEventPassData) => {
    if (options?.excludeApiCall) {
      return onLogoutSuccess(options);
    }
    return logoutMutationData.mutateAsync();
  });

  const onForgotPasswordSuccess = useMemoizedFn(
    (response: ForgetPasswordMutationResponse) => {
      successErrorNotification(response);
    }
  );

  const forgoPasswordMutationData = useMutation({
    mutationFn: forgetPasswordMutation,
    onSuccess: onForgotPasswordSuccess,
  });

  const forgotPassword = useMemoizedFn(
    async (data: ForgetPasswordMutationParams) => {
      return forgoPasswordMutationData.mutateAsync(data);
    }
  );

  return {
    initiateUserLoginState,
    loginMutation: {
      ...loginMutationData,
      login,
    },
    logoutMutation: {
      ...logoutMutationData,
      logout,
    },
    ...userSlice,
    userQuery,
    forgotPasswordMutation: {
      ...forgoPasswordMutationData,
      forgotPassword,
    },
  };
}
