import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Description from "./pages/Description";

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Switch>
          <Route path="/ol/:id" component={Description} />
          <Route path="/" component={Home} />
        </Switch>

        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
