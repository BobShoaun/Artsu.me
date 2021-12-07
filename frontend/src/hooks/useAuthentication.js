import { useDispatch, useSelector } from "react-redux";
import { login as authLogin, logout as authLogout } from "../store/authenticationSlice";
import { useHistory } from "react-router";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(state => state.authentication);
  const history = useHistory();

  const login = (user, accessToken) => {
    dispatch(authLogin({ user, accessToken }));
  };

  const logout = () => {
    dispatch(authLogout());
  };

  const redirectToLogin = () => {
    const params = new URLSearchParams();
    params.set("destination", history.location.pathname);
    history.push(`/login?${params}`);
  };

  const isLoggedIn = accessToken && user;

  return {
    isLoggedIn,
    accessToken,
    user,
    login,
    logout,
    redirectToLogin,
  };
};
