import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import Heatmap from './pages/Heatmap'
import UserProfile from './pages/UserProfile'
import Signup from './pages/Signup'
import GoogleSignup from './pages/GoogleSignup'

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <SearchPage />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <LoginPage />
          )}
        />
        <Route
          exact
          path="/heatmap"
          render={() => (
            <Heatmap />
          )}
        />
        <Route
          exact
          path="/me"
          render={() => (<UserProfile />)}
        />
        <Route
          exact
          path="/signup"
          render={() => (
            <Signup />
          )}
        />
        <Route
          exact
          path="/google-signup"
          render={() => (
            <GoogleSignup />
          )}
        />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root'),
)
