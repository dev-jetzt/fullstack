import { MovieGetResponseDto } from '../shared/dtos/movie.get.response.dto';
import { MoviePutRequestDto } from '../shared/dtos/movie.put.request.dto';

export default class Movie {
  public id!: string;
  public title!: string;
  public year?: number;
  public created!: Date;
  public updated!: Date;

  public static fromGetResponseDto(dto: MovieGetResponseDto) {
    const movie = new Movie();
    movie.id = dto.id;
    movie.title = dto.title;
    movie.year = dto.year;
    movie.created = new Date(dto.created);
    movie.updated = new Date(dto.updated);
    return movie;
  }

  public toPutRequestDto(): MoviePutRequestDto {
    const dto = new MoviePutRequestDto();
    dto.id = this.id;
    dto.title = this.title;
    dto.year = this.year;
    return dto;
  }
}
