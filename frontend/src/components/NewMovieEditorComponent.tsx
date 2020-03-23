import React, { FormEvent } from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { storeContext } from '../Store';
import Movie from '../models/Movie';
import { observable, action } from 'mobx';
import { MoviePostRequestDto } from '../shared/dtos/movie.post.request.dto';

@observer
class NewMovieEditorComponent extends React.Component<
  RouteComponentProps<{ id: string }>
> {
  // Loads the "context" (i.e. the store)
  static contextType = storeContext;
  context!: React.ContextType<typeof storeContext>;

  @observable private dto: MoviePostRequestDto = MoviePostRequestDto.empty;

  componentDidMount() {
    this.primeDto();
  }

  @action private primeDto = () => {
    this.dto = MoviePostRequestDto.empty;
  };

  private onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await this.context.createMovie(this.dto);
    window.alert('Gespeichert!');
    this.props.history.push('/');
    this.primeDto();
  };

  public render() {
    return (
      <div className="section">
        <div className="container">
          <h2>Neuen Film hinzufügen</h2>
          <Link to={`/`}>Zurück</Link>
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
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(NewMovieEditorComponent);
