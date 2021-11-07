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

const App = () => {
  return (
    <Provider store={store}>
      <main className="dark">
        <Router>
          <Switch>
            <Route path="/portfolio/edit/styles/:slug" component={PortfolioEditorPageStyles}/>
            <Route path="/portfolio/edit/content/:slug" component={PortfolioEditorPageContent}/>
            <Route path="/portfolio/:slug" component={PortfolioPage} />
            <Route path="/artwork/:id" component={ArtworkPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile/:username" component={ProfilePage} />
            <Route path="/search/:slug" component={SearchPage} />
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
