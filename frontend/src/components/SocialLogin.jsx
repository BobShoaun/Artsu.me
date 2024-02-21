import { googleClientId, facebookAppId } from "../config";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useAuthentication } from "../hooks/useAuthentication";

const SocialLogin = () => {
  const { loginGoogle, loginFacebook } = useAuthentication();

  const onGoogleLoginSuccess = async response => {
    loginGoogle(response.tokenId);
  };

  const onFacebookLoginSuccess = async response => {
    console.log(response);
    loginFacebook(response.accessToken);
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
              className="py-2 rounded-sm shadow-md bg-gray-100 hover:text-white hover:bg-red-500 transition flex items-center justify-center gap-1 w-full"
            >
              <img src="/icons/google logo.svg" className="h-7" alt="google logo" />
              <p className="font-semibold tracking-wider text-sm">GOOGLE</p>
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
              className="py-2 rounded-sm shadow-md bg-gray-100 hover:text-white hover:bg-blue-500 transition flex items-center justify-center gap-1 w-full"
            >
              <img src="/icons/facebook logo.svg" className="h-7" alt="facebook logo" />
              <p className="font-semibold tracking-wider text-sm">FACEBOOK</p>
            </button>
          )}
        />
      </div>
    </section>
  );
};

export default SocialLogin;
