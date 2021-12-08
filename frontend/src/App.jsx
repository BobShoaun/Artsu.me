import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";

import MainPage from "./MainPage";
import PortfolioPage from "./PortfolioPage";
import PortfolioEditorPage from "./PortfolioEditorPage";
import ArtworkPage from "./ArtworkPage";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import SearchPage from "./SearchPage";
import AdminPanel from "./AdminPanel";
import AdminProfileViewer from "./AdminProfileViewer";
import AdminArtworkViewer from "./AdminArtworkViewer";
import ArtworkListPage from "./ArtworkListPage";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
