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
          path="/me"
          render={() => (
            <UserProfile />
          )}
        />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root'),
)
