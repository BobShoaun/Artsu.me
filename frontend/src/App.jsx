import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainPage from "./MainPage";
import PortfolioPage from "./PortfolioPage";
import PortfolioEditorPage from "./PortfolioEditorPage";
import ArtworkPage from "./ArtworkPage";

const App = () => {
  return (
    <main className="dark">
      <Router>
        <Switch>
          <Route path="/portfolio/:slug" component={PortfolioPage} />
          <Route path="/portfolio/edit/:slug" component={PortfolioEditorPage} />
          <Route path="/artwork/:id" component={ArtworkPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </main>
  );
};

export default App;
