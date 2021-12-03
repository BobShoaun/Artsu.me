import { useDispatch, useSelector } from "react-redux";
import { login as authLogin, logout as authLogout } from "../store/authenticationSlice";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(state => state.authentication);

  const login = (user, accessToken) => {
    dispatch(authLogin({ user, accessToken }));
  };

  const logout = () => {
    dispatch(authLogout());
  };

  return [accessToken, user, login, logout];
};
