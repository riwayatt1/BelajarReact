import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import Profile from './pages/Profile';
import App from './App';


const Root = () => (
  <div>
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/list-person" />}
        />
        <Route exact path="/list-person" component={App} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  </div>
);

export default Root;
