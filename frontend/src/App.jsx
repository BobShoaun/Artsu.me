import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";

import MainPage from "./MainPage";
import PortfolioPage from "./PortfolioPage";
import PortfolioEditorPageStyles from "./PortfolioEditorPageStyles";
import PortfolioEditorPageContent from "./PortfolioEditorPageContent";
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

const App = () => {
  return (
    <Provider store={store}>
      <main className="dark">
        <Router>
          <Switch>
            <Route
              path="/portfolio/edit/styles/:username"
              component={PortfolioEditorPageStyles}
            />
            <Route
              path="/portfolio/edit/content/:username"
              component={PortfolioEditorPageContent}
            />
            <Route path="/portfolio/:username" component={PortfolioPage} />
            <Route path="/artwork/:id" component={ArtworkPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route
              path="/profile/:username/upload_avatar"
              component={UploadAvatarPage}
            />
            <Route
              path="/profile/:username/upload"
              component={UploadImagePage}
            />
            <Route path="/profile/:username" component={ProfilePage} />
            <Route path="/search/:username" component={SearchPage} />
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
