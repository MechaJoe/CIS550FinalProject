/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import SearchPage from './pages/SearchPage';
import SongPage from './pages/SongPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<SearchPage />
							)}/>
        <Route exact
							path="/song"
							render={() => (
								<SongPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);