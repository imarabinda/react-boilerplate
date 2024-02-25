import { useCreation } from "ahooks";
import React, { createContext } from "react";
import useAuthProviderValue, {
  useAuthProviderValueProps,
} from "../hooks/useAuthProviderValue";

const AuthContext = createContext(
  {} as ReturnType<typeof useAuthProviderValue>
);

type AuthProviderProps = {
  children: React.ReactNode;
} & useAuthProviderValueProps;
export function AuthProvider(props: AuthProviderProps) {
  const { children, ...rest } = props;
  const value = useAuthProviderValue(rest);
  return (
    <AuthContext.Provider value={useCreation(() => value, [value])}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
