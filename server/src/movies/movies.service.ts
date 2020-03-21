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
    await this.moviesRepository.save(movie);
    return this.findOne(movie.id);
  }

  async delete(id: string): Promise<void> {
    await this.moviesRepository.delete(id);
  }
}
