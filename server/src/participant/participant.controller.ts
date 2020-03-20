import {
  Controller,
  Get,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { GetParticipantResponseDto } from '../shared/dtos/getParticipantResponse.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetParticipantsResponseDto } from '../shared/dtos/getParticipantsResponse.dto';
import { ParticipantService } from './participant.service';
import { Participant } from '../shared/interfaces/participant.interface';

@Controller('api/participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @UseGuards(JwtAuthGuard)
  @Get('find/:slug')
  async getParticipant(
    @Param('slug') slug,
  ): Promise<GetParticipantResponseDto> {
    const participant = this.participantService.findOne(slug);
    if (!participant) throw new BadRequestException();
    const dto = new GetParticipantResponseDto(participant);
    return dto;
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(): Promise<GetParticipantsResponseDto> {
    const list = this.participantService.getListOfPublished();
    const participants = list
      .map(n => this.participantService.findOne(n))
      .filter(p => p) as Participant[];
    return new GetParticipantsResponseDto(participants);
  }
}
