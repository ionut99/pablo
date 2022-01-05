import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./css/index.css";
import Home from "./Home";
import ChatRoom from "./ChatRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:roomId/:userName" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default App;