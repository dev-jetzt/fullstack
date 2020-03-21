import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { storeContext } from '../Store';
import Movie from '../models/Movie';

@observer
class MovieDetailsComponent extends React.Component<
  RouteComponentProps<{ id: string }>
> {
  // Loads the "context" (i.e. the store)
  static contextType = storeContext;
  context!: React.ContextType<typeof storeContext>;

  componentDidMount() {
    this.context.loadOneMovie(this.requestedId);
  }

  private get requestedId(): string {
    return this.props.match.params.id;
  }

  private get movie(): Movie | undefined {
    return this.context.movies.find(m => m.id === this.requestedId);
  }

  public render() {
    return (
      <div className="section">
        <div className="container">
          <h2>{this.movie?.title}</h2>
          <Link to={`/movie/${this.requestedId}/edit`}>Bearbeiten</Link>
          <p>Aus dem Jahr: {this.movie?.year}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieDetailsComponent);
