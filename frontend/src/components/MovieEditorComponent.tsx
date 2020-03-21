import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { storeContext } from '../Store';
import Movie from '../models/Movie';
import { observable, action, runInAction } from 'mobx';
import { MoviePutRequestDto } from '../shared/dtos/movie.put.request.dto';

@observer
class MovieEditorComponent extends React.Component<
  RouteComponentProps<{ id: string }>
> {
  // Loads the "context" (i.e. the store)
  static contextType = storeContext;
  context!: React.ContextType<typeof storeContext>;

  componentDidMount() {
    this.loadMovieAndPrepareDto();
  }

  @action
  private loadMovieAndPrepareDto = async () => {
    await this.context.loadOneMovie(this.requestedId);
    runInAction(() => (this.dto = this.movie?.toPutRequestDto()));
  };

  private get requestedId(): string {
    return this.props.match.params.id;
  }

  private get movie(): Movie | undefined {
    return this.context.movies.find(m => m.id === this.requestedId);
  }

  @observable private dto?: MoviePutRequestDto = new MoviePutRequestDto();

  public render() {
    return (
      <div className="section">
        <div className="container">
          <h2>Bearbeiten: {this.movie?.title}</h2>
          <Link to={`/movie/${this.requestedId}`}>Bearbeitung beenden</Link>
          <form className="mt-5">
            <div className="form-group">
              <label>Filmtitel</label>
              <input
                type="text"
                className="form-control"
                value={this.dto?.title}
                onChange={
                  this.dto
                    ? action(e => {
                        this.dto!.title = e.target.value;
                      })
                    : undefined
                }
              />
            </div>
            <div className="form-group">
              <label>Jahr</label>
              <input type="number" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">
              Speichern
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieEditorComponent);
