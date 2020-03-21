import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { store, storeContext } from './Store';
import MovieListComponent from './components/MovieListComponent';
import MovieDetailsComponent from './components/MovieDetailsComponent';
import HeaderComponent from './components/HeaderComponent';
import MovieEditorComponent from './components/MovieEditorComponent';

class App extends React.Component {
  public render() {
    return (
      <storeContext.Provider value={store}>
        <Router>
          <HeaderComponent />
          <Switch>
            <Route path="/" exact={true}>
              <MovieListComponent />
            </Route>
            <Route path="/movie/:id" exact={true}>
              <MovieDetailsComponent />
            </Route>
            <Route path="/movie/:id/edit" exact={true}>
              <MovieEditorComponent />
            </Route>
          </Switch>
        </Router>
      </storeContext.Provider>
    );
  }
}

export default App;
