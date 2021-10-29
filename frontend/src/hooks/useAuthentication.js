import { useDispatch, useSelector } from "react-redux";
import {
  login as authLogin,
  logout as authLogout,
} from "../store/authenticationSlice";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const jwt = useSelector(state => state.authentication.jwt);

  const login = (username, password) => {
    dispatch(authLogin(username, password));
  };

  const logout = () => {
    dispatch(authLogout());
  };

  return [jwt, login, logout];
};
