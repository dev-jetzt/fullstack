import { observable } from 'mobx';

export class MoviePostRequestDto {
  @observable title!: string;
  @observable year?: number;

  public static get empty(): MoviePostRequestDto {
    const dto = new MoviePostRequestDto();
    dto.title = '';
    return dto;
  }
}
