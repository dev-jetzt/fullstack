import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieMapper } from './movie.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService, MovieMapper],
  controllers: [MoviesController],
})
export class MoviesModule {}
