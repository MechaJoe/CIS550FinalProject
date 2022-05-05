import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import SearchPage from './pages/SearchPage'
import SongPage from './pages/SongPage'
import ArtistPage from './pages/ArtistPage'
import EditUser from './pages/EditUser'

import 'antd/dist/antd.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import LoginPage from './pages/LoginPage'
import Heatmap from './pages/Heatmap'
import UserProfile from './pages/UserProfile'
import Signup from './pages/Signup'
import FederatedSignup from './pages/FederatedSignup'

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route
          exact
          path="/song"
          render={() => <SongPage />}
        />
        <Route
          exact
          path="/artist"
          render={() => <ArtistPage />}
        />
        <Route
          exact
          path="/"
          render={() => <SearchPage />}
        />
        <Route
          exact
          path="/login"
          render={() => <LoginPage />}
        />
        <Route
          exact
          path="/heatmap"
          render={() => <Heatmap />}
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
          path="/federated-signup"
          render={() => (
            <FederatedSignup />
          )}
        />
        <Route
          exact
          path="/edit"
          render={() => <EditUser />}
        />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root'),
)
