import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "./config";

import store from "./store";
import { Provider } from "react-redux";

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

export const AppContext = createContext();

axios.defaults.baseURL = apiUrl;

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); // logged in user

  const isLoggedIn = accessToken && user;

  useEffect(() => {
    // authenticate automatically if there is refresh token
    (async () => {
      try {
        const { data } = await axios.get("/auth/refresh", { withCredentials: true });
        setUser(data.user);
        setAccessToken(data.accessToken);
      } catch (e) {
        // unautenticated
      }
    })();
  }, []);

  const logout = async () => {
    try {
      await axios.delete("/auth/logout", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      setAccessToken(null);
      setUser(null);
    } catch (e) {
      console.error("error logging out", e);
    }
  };

  return (
    <Provider store={store}>
      <AppContext.Provider
        value={{ isLoggedIn, accessToken, setAccessToken, user, setUser, logout }}
      >
        <main className="dark">
          <Router>
            <Switch>
              <Route exact path="/portfolio/editor" component={PortfolioEditorPage} />
              <Route exact path="/portfolio/:username" component={PortfolioPage} />
              <Route exact path="/artwork/:id" component={ArtworkPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
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
        </main>
      </AppContext.Provider>
    </Provider>
  );
};

export default App;
