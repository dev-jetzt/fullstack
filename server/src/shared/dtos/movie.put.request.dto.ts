import { observable } from 'mobx';

export class MoviePutRequestDto {
  id!: string;
  @observable title!: string;
  @observable year?: number;
}
