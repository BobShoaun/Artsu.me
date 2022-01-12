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

      const accessToken = data.accessToken;
      const user = data.user;

      setUser(user);
      setAccessToken(accessToken);

      const params = new URLSearchParams(history.location.search);
      // history.push(params.get("destination") ?? "/");
      history.push("/username");
    } catch (e) {
      // setUsernameError("invalid credentials");
    }
  };

  const onFacebookLoginSuccess = async response => {
    console.log(response);
  };

  return (
    <section>
      <div className="mb-6 flex items-center gap-3 text-gray-300">
        <hr className="w-1/2 border-gray-400" />
        <p className="text-sm whitespace-nowrap">or login with</p>
        <hr className="w-1/2 border-gray-400" />
      </div>

      <div className="text-center text-white font-semibold">
        <GoogleLogin
          clientId={googleClientId}
          render={({ onClick, disabled }) => (
            <button
              onClick={onClick}
              disabled={disabled}
              className="font-semibold tracking-wider py-2.5 mb-3 text-sm rounded-sm shadow-lg bg-red-700 hover:bg-red-600 transition block w-full"
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
          autoLoad
          callback={onFacebookLoginSuccess}
          render={({ onClick }) => (
            <button
              onClick={onClick}
              className="font-semibold tracking-wider py-2.5 mb-5 text-sm rounded-sm shadow-lg bg-blue-700 hover:bg-blue-600 transition block w-full"
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
