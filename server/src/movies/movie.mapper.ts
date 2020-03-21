import { MovieGetResponseDto } from '../shared/dtos/movie.get.response.dto';
import { Movie } from './movie.entity';
import { Injectable } from '@nestjs/common';
import { MoviePostRequestDto } from '../shared/dtos/movie.post.request.dto';
import { MoviePutRequestDto } from '../shared/dtos/movie.put.request.dto';

@Injectable()
export class MovieMapper {
  entityToDto(entity: Movie): MovieGetResponseDto {
    const dto = new MovieGetResponseDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.year = entity.year;
    dto.created = JSON.stringify(entity.created);
    dto.updated = JSON.stringify(entity.updated);
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
