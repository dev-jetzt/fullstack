import { Injectable } from '@nestjs/common';

import { MovieGetResponseDto } from '../shared/dtos/movie.get.response.dto';
import { MoviePostRequestDto } from '../shared/dtos/movie.post.request.dto';
import { MoviePutRequestDto } from '../shared/dtos/movie.put.request.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieMapper {
  entityToDto(entity: Movie): MovieGetResponseDto {
    const dto = new MovieGetResponseDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.year = entity.year;
    dto.created = entity.created?.toISOString();
    dto.updated = entity.updated?.toISOString();
    return dto;
  }

  postDtoToEntity(dto: MoviePostRequestDto): Movie {
    const movie = new Movie();
    movie.title = dto.title;
    movie.year = dto.year;
    return movie;
  }

  putDtoToEntity(dto: MoviePutRequestDto): Movie {
    const movie = new Movie();
    movie.id = dto.id;
    movie.title = dto.title;
    movie.year = dto.year;
    return movie;
  }
}
