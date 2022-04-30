import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

// import SearchPage from './pages/SearchPage'
import SongPage from './pages/SongPage'

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            // <SearchPage />
            <SongPage />
          )}
        />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root'),
)
