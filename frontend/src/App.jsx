import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainPage from "./MainPage";
import PortfolioPage from "./PortfolioPage";
import PortfolioEditorPage from "./PortfolioEditorPage";
import ArtworkPage from "./ArtworkPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/portfolio/:username" component={PortfolioPage} />
        <Route
          path="/portfolio/edit/:username"
          component={PortfolioEditorPage}
        />
        <Route path="/artwork/:id" component={ArtworkPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
