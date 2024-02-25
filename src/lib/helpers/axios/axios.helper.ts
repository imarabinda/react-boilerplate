let accessToken: Undefinable<Nullable<string>> = null;

export const setAxiosAccessToken = (_accessToken?: Nullable<string>) => {
  accessToken = _accessToken;
};

export const getAxiosAccessToken = () => {
  return accessToken;
};
