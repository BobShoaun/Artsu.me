import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainPage from "./MainPage";
import PortfolioPage from "./PortfolioPage";
import PortfolioEditorPage from "./PortfolioEditorPage";
import ArtworkPage from "./ArtworkPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const App = () => {
  return (
    <main className="dark">
      <Router>
        <Switch>
          <Route path="/portfolio/:slug" component={PortfolioPage} />
          <Route path="/portfolio/edit/:slug" component={PortfolioEditorPage} />
          <Route path="/artwork/:id" component={ArtworkPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </main>
  );
};

export default App;
