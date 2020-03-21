import { observable } from 'mobx';

export class MoviePutRequestDto {
  id!: string;
  @observable title!: string;
  @observable year?: number;

  public static get empty(): MoviePutRequestDto {
    const dto = new MoviePutRequestDto();
    dto.title = '';
    return dto;
  }
}
