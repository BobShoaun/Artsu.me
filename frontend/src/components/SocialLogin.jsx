import { Link, useHistory } from "react-router-dom";
import { useRef, useState, useContext, useEffect } from "react";
import { googleClientId, facebookAppId } from "../config";
import axios from "axios";
import { AppContext } from "../App";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const SocialLogin = () => {
  const history = useHistory();

  const { setAccessToken, setUser } = useContext(AppContext);

  const onGoogleLoginSuccess = async response => {
    try {
      const { data } = await axios.post(
        `/auth/google`,
        {
          token: response.tokenId,
        },
        { withCredentials: true }
      );

      setUser(data.user);
      setAccessToken(data.accessToken);

      redirect(data.user);
    } catch (e) {}
  };

  const onFacebookLoginSuccess = async response => {
    try {
      console.log(response);

      const { data } = await axios.post(
        `/auth/facebook`,
        {
          token: response.accessToken,
        },
        { withCredentials: true }
      );

      setUser(data.user);
      setAccessToken(data.accessToken);

      redirect(data.user);
    } catch (e) {}
  };

  const redirect = user => {
    if (user.username) {
      const params = new URLSearchParams(history.location.search);
      history.push(params.get("destination") ?? "/");
      return;
    }
    // no username, have user set it
    history.push("/username");
  };

  return (
    <section>
      <div className="mb-6 flex items-center gap-3 text-gray-300">
        <hr className="w-1/2 border-gray-400" />
        <p className="text-sm whitespace-nowrap">or continue with</p>
        <hr className="w-1/2 border-gray-400" />
      </div>

      <div className="flex items-center gap-3 text-center text-gray-800 font-semibold mb-5">
        <GoogleLogin
          clientId={googleClientId}
          render={({ onClick, disabled }) => (
            <button
              onClick={onClick}
              disabled={disabled}
              className="font-semibold tracking-wider py-2.5 text-sm rounded-sm shadow-md bg-gray-100 hover:text-white hover:bg-red-500 transition block w-full"
            >
              GOOGLE
            </button>
          )}
          onSuccess={onGoogleLoginSuccess}
          onFailure={null}
          cookiePolicy="single_host_origin"
        />

        <FacebookLogin
          appId={facebookAppId}
          // autoLoad
          callback={onFacebookLoginSuccess}
          render={({ onClick }) => (
            <button
              onClick={onClick}
              className="font-semibold tracking-wider py-2.5 text-sm rounded-sm shadow-md bg-gray-100 hover:text-white hover:bg-blue-500 transition block w-full"
            >
              FACEBOOK
            </button>
          )}
        />
      </div>
    </section>
  );
};

export default SocialLogin;
