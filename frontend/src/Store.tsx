import React from 'react';
import { observable, configure, action, runInAction } from 'mobx';
import Movie from './models/Movie';
import axios from 'axios';
import config from './config';
import { MoviePutRequestDto } from './shared/dtos/movie.put.request.dto';
import { MoviePostRequestDto } from './shared/dtos/movie.post.request.dto';

configure({ enforceActions: 'observed' });

export class Store {
  @observable public movies: Movie[] = [];

  @action
  public loadMovies = async () => {
    const result = await axios.get(`${config.apiUrl}/movies`);
    const movies = result.data.map(Movie.fromGetResponseDto);
    runInAction(() => {
      // Wondering why we need this? Check https://mobx.js.org/best/actions.html
      this.movies = movies;
    });
  };

  @action
  public loadOneMovie = async (id: string) => {
    const result = await axios.get(`${config.apiUrl}/movies/${id}`);
    const movie = Movie.fromGetResponseDto(result.data);
    if (!movie) return;
    await runInAction(() => {
      this.movies = this.movies.filter(m => m.id !== movie.id);
      this.movies.push(movie);
    });
  };

  @action
  public createMovie = async (dto: MoviePostRequestDto) => {
    const result = await axios.post(`${config.apiUrl}/movies`, dto);
    const movie = Movie.fromGetResponseDto(result.data);
    if (!movie) return;
    await runInAction(() => {
      this.movies = this.movies.filter(m => m.id !== movie.id);
      this.movies.push(movie);
    });
  };

  @action
  public updateMovie = async (dto: MoviePutRequestDto) => {
    const result = await axios.put(`${config.apiUrl}/movies`, dto);
    const movie = Movie.fromGetResponseDto(result.data);
    if (!movie) return;
    await runInAction(() => {
      this.movies = this.movies.filter(m => m.id !== movie.id);
      this.movies.push(movie);
    });
  };

  @action
  public deleteMovie = async (id: string): Promise<void> => {
    const result = await axios.delete(`${config.apiUrl}/movies/${id}`);
    if (result.status === 200) {
      return;
    } else {
      throw new Error('Deletion failed');
    }
  };
}

export const store = new Store();
export const storeContext = React.createContext(store);
