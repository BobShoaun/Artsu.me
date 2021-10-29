import { useDispatch, useSelector } from "react-redux";
import {
  login as authLogin,
  logout as authLogout,
} from "../store/authenticationSlice";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const { jwt, user } = useSelector(state => state.authentication);

  const login = (username, password) => {
    dispatch(authLogin({ username, password }));
  };

  const logout = () => {
    dispatch(authLogout());
  };

  return [jwt, user, login, logout];
};
