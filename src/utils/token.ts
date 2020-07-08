const AUTH_TOKEN: string = "auth-token";

export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const setToken = (token: string) =>
  localStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN);
