import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import UploadImagePage from "./UploadImagePage";
import UploadAvatarPage from "./UploadAvatarPage";
import ArtworkListPage from "./ArtworkListPage";

const App = () => {
  return (
    <Provider store={store}>
      <main className="dark">
        <Router>
          <Switch>
            <Route path="/portfolio/editor" component={PortfolioEditorPage} />
            <Route path="/portfolio/:username" component={PortfolioPage} />
            <Route path="/artwork/:id" component={ArtworkPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/artworks" component={ArtworkListPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/admin/artwork/:id" component={AdminArtworkViewer} />
            <Route path="/admin/:username" component={AdminProfileViewer} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/" component={MainPage} />
          </Switch>
        </Router>
      </main>
    </Provider>
  );
};

export default App;
