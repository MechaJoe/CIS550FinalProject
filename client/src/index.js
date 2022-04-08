import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import SearchPage from './pages/SearchPage'

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route
          exact
          path="/search"
          render={() => (
            <SearchPage />
          )}
        />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root'),
)
