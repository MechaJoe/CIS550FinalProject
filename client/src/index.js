/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import SearchPage from './pages/SearchPage'
import SongPage from './pages/SongPage'
import ArtistPage from './pages/ArtistPage'
import EditUser from './pages/EditUser'

import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"

import LoginPage from './pages/LoginPage'
import Heatmap from './pages/Heatmap'
import UserProfile from './pages/UserProfile'

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
          render={() =>  <LoginPage />}
        />
        <Route
          exact
          path="/heatmap"
          render={() =>  <Heatmap />}
        />
        <Route
          exact
          path="/me"
          render={() => (<UserProfile />)}
        />
        <Route
          exact
          path="/edit"
          render={() => <EditUser />}
        />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);