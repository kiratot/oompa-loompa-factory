import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/Header";
import "./App.css";

import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Switch>
          <Route path="/ol/:id" component={Details} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
