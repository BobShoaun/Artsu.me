import { useHistory } from "react-router";
import { AppContext } from "../App";
import { useContext } from "react";

export const useAuthentication = () => {
  const history = useHistory();
  const { api, accessToken, user, setAccessToken, setUser } = useContext(AppContext);

  const redirectToLogin = () => {
    const params = new URLSearchParams();
    params.set("destination", history.location.pathname);
    history.push(`/login?${params}`);
  };

  const isLoggedIn = !!(accessToken && user);

  const register = async (email, givenName, familyName, password) => {
    try {
      await api.public.post("/auth/register", {
        email,
        givenName,
        familyName,
        password,
      });
      return await login(email, password);
    } catch {
      return false;
    }
  };

  const login = async (usernameOrEmail, password) => {
    const isEmail = /\S+@\S+\.\S+/.test(usernameOrEmail);
    const body = isEmail
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };
    try {
      const { data } = await api.public.post(`/auth/login`, body, { withCredentials: true });

      if (!data.user.isVerified)
        // email not verified, verify first
        history.push("/email-verification");
      else if (!data.user.username)
        // no username, have user set it
        history.push("/username");
      else gotoDestination();

      setAccessToken(data.accessToken);
      setUser(data.user);
      return true;
    } catch {
      return false;
    }
  };

  const loginGoogle = async token => {
    try {
      const { data } = await api.public.post(`/auth/google`, { token }, { withCredentials: true });
      if (!data.user.username)
        // no username, have user set it
        history.push("/username");
      else gotoDestination();
      setAccessToken(data.accessToken);
      setUser(data.user);
      return true;
    } catch {
      return false;
    }
  };

  const loginFacebook = async token => {
    try {
      const { data } = await api.public.post(
        `/auth/facebook`,
        { token },
        { withCredentials: true }
      );

      if (!data.user.username)
        // no username, have user set it
        history.push("/username");
      else gotoDestination();
      setAccessToken(data.accessToken);
      setUser(data.user);
      return true;
    } catch {
      return false;
    }
  };

  const gotoDestination = () => {
    const params = new URLSearchParams(history.location.search);
    history.push(params.get("destination") ?? "/");
  };

  const logout = async () => {
    try {
      await api.protected.delete("/auth/logout");
      setAccessToken(null);
      setUser(null);
    } catch (e) {
      console.error("error logging out", e);
    }
  };

  return {
    isLoggedIn,
    accessToken,
    user,
    register,
    login,
    loginGoogle,
    loginFacebook,
    logout,
    redirectToLogin,
    gotoDestination,
  };
};
