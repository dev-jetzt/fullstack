import React, { FormEvent } from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { storeContext } from '../Store';
import Movie from '../models/Movie';
import { observable, action } from 'mobx';
import { MoviePutRequestDto } from '../shared/dtos/movie.put.request.dto';

@observer
class MovieEditorComponent extends React.Component<
  RouteComponentProps<{ id: string }>
> {
  // Loads the "context" (i.e. the store)
  static contextType = storeContext;
  context!: React.ContextType<typeof storeContext>;

  @observable private dto: MoviePutRequestDto = MoviePutRequestDto.empty;

  private get requestedId(): string {
    return this.props.match.params.id;
  }

  private get movie(): Movie | undefined {
    return this.context.movies.find(m => m.id === this.requestedId);
  }

  componentDidMount() {
    this.loadMovieAndPrimeDto();
  }

  @action
  private loadMovieAndPrimeDto = async () => {
    await this.context.loadOneMovie(this.requestedId);
    this.primeDto();
  };

  @action private primeDto = () => {
    this.dto = this.movie!.toPutRequestDto();
  };

  private delete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const confirmation = window.confirm('Willst du das wirklich?');
    if (confirmation) {
      await this.context.deleteMovie(this.requestedId);
      window.alert('Gelöscht!');
      this.props.history.push('/');
    }
  };

  private onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await this.context.updateMovie(this.dto);
    window.alert('Gespeichert!');
    this.primeDto();
  };

  public render() {
    return (
      <div className="section">
        <div className="container">
          <h2>Bearbeiten: {this.movie?.title}</h2>
          <Link to={`/movie/${this.requestedId}`}>Bearbeitung beenden</Link>
          <form className="mt-5" onSubmit={this.onSubmit}>
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
            </button>{' '}
            <button className="btn btn-danger" onClick={this.delete}>
              Löschen
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieEditorComponent);
