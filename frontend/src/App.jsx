import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { apiUrl } from "./config";

import store from "./store";
import { Provider } from "react-redux";
import { useAuthentication } from "./hooks/useAuthentication";

import MainPage from "./pages/MainPage";
import PortfolioPage from "./pages/PortfolioPage";
import PortfolioEditorPage from "./pages/PortfolioEditorPage";
import ArtworkPage from "./pages/ArtworkPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import AdminPanel from "./pages/AdminPanel";
import AdminProfileViewer from "./pages/AdminProfileViewer";
import AdminArtworkViewer from "./pages/AdminArtworkViewer";
import ArtworkListPage from "./pages/ArtworkListPage";
import NotFound from "./components/NotFound";
import UsernamePage from "./pages/UsernamePage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import EmailVericationSuccessPage from "./pages/EmailVerificationSuccessPage";

export const AppContext = createContext();

axios.defaults.baseURL = apiUrl;

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); // logged in user
  // const { refreshAccessToken } = useAuthentication(api);

  const api = useMemo(() => {
    // for public routes without access token
    const _public = axios.create({ baseURL: apiUrl });

    // for protected routes needed access token
    const _protected = axios.create({
      baseURL: apiUrl,
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    _protected.interceptors.response.use(undefined, async error => {
      const originalRequest = error.config;
      if (error.response.status !== 401 || originalRequest._retry) return Promise.reject(error);
      // intercept if error is 401, attempt to refresh access token
      const newAccessToken = await refreshAccessToken();
      if (!newAccessToken) return Promise.reject(error);

      console.log("refreshed access token", newAccessToken);

      originalRequest._retry = true;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return _protected(originalRequest);
    });
    return { public: _public, protected: _protected };
  }, [accessToken]);

  const refreshAccessToken = async () => {
    try {
      const { data } = await api.public.get("/auth/refresh", { withCredentials: true });
      setUser(data.user);
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (e) {
      // unauthenticated
    }
    return null;
  };

  // authenticate automatically if there is refresh token
  useEffect(refreshAccessToken, []);

  return (
    <main className="dark">
      <Provider store={store}>
        <AppContext.Provider value={{ accessToken, setAccessToken, user, setUser, api }}>
          <Router>
            <Switch>
              <Route exact path="/portfolio/editor" component={PortfolioEditorPage} />
              <Route exact path="/portfolio/:username" component={PortfolioPage} />
              <Route exact path="/artwork/:id" component={ArtworkPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/username" component={UsernamePage} />
              <Route exact path="/email-verification" component={EmailVerificationPage} />
              <Route
                exact
                path="/email-verification/success"
                component={EmailVericationSuccessPage}
              />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/artworks" component={ArtworkListPage} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/admin/artwork/:id" component={AdminArtworkViewer} />
              <Route exact path="/admin/:id" component={AdminProfileViewer} />
              <Route exact path="/admin" component={AdminPanel} />
              <Route exact path="/" component={MainPage} />
              <Route exact path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </Router>
        </AppContext.Provider>
      </Provider>
    </main>
  );
};

export default App;
