import React from 'react';
import { storeContext } from '../Store';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@observer
class MovieListComponent extends React.Component {
  // Loads the "context" (i.e. the store)
  static contextType = storeContext;
  context!: React.ContextType<typeof storeContext>;

  componentDidMount() {
    this.context.loadMovies();
  }

  public render() {
    return (
      <div className="section">
        <div className="container">
          <h2>Meine Filme</h2>
          <Link to={`/movie/new`}>Film hinzufügen</Link>
          <ul className="mt-5">
            {this.context.movies
              .slice()
              .sort((m1, m2) =>
                m1.title
                  .toLocaleLowerCase()
                  .localeCompare(m2.title.toLocaleLowerCase()),
              )
              .map(m => (
                <li key={m.id}>
                  <Link to={`/movie/${m.id}`}>{m.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MovieListComponent;
