import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findOne(id);
    if (movie === undefined) throw new NotFoundException();
    return movie;
  }

  async save(movie: Movie): Promise<Movie> {
    return this.moviesRepository.save(movie);
  }
}
