import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { MovieGetResponseDto } from '../shared/dtos/movie.get.response.dto';
import { MovieMapper } from './movie.mapper';
import { MoviePostRequestDto } from '../shared/dtos/movie.post.request.dto';
import { MoviePutRequestDto } from '../shared/dtos/movie.put.request.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly movieMapper: MovieMapper,
  ) {}

  @Get()
  async findAll(): Promise<MovieGetResponseDto[]> {
    return (await this.moviesService.findAll()).map(
      this.movieMapper.entityToDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<MovieGetResponseDto> {
    const foundMovie = await this.moviesService.findOne(id);
    return this.movieMapper.entityToDto(foundMovie);
  }

  @Post()
  async create(@Body() dto: MoviePostRequestDto): Promise<MovieGetResponseDto> {
    const movie = this.movieMapper.postDtoToEntity(dto);
    const result = await this.moviesService.save(movie);
    return this.movieMapper.entityToDto(result);
  }

  @Put()
  async update(@Body() dto: MoviePutRequestDto): Promise<MovieGetResponseDto> {
    const movie = this.movieMapper.putDtoToEntity(dto);
    const result = await this.moviesService.save(movie);
    return this.movieMapper.entityToDto(result);
  }
}
