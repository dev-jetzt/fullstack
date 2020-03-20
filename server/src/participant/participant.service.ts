import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Participant } from '../shared/interfaces/participant.interface';
import { CampParticipation } from '../shared/interfaces/campParticipation.interface';

@Injectable()
export class ParticipantService {
  findOne(slug: string): Participant | undefined {
    try {
      const raw = fs.readFileSync(`staticData/participants/${slug}.json`);
      const participant: Participant = JSON.parse(raw.toString());
      // Include Participation
      participant.campParticipation = undefined; // To avoid participants sneaking in their own participation.
      const campParticipation = this.findCampParticipation(slug);
      participant.campParticipation = campParticipation;
      // Add central skills
      participant.skills.push('JavaScript', 'TypeScript', 'CSS', 'Git');
      return participant;
    } catch (error) {
      return undefined;
    }
  }
  findCampParticipation(slug: string): CampParticipation | undefined {
    try {
      const raw = fs.readFileSync('staticData/campParticipations.json');
      const participations: CampParticipation[] = JSON.parse(raw.toString());
      const campParticipation = participations.find(
        p => p.participant === slug,
      );
      return campParticipation;
    } catch (error) {
      return undefined;
    }
  }
  getListOfPublished(): string[] {
    try {
      const raw = fs.readFileSync('staticData/publishedParticipants.json');
      const list = JSON.parse(raw.toString());
      return list;
    } catch (error) {
      return [];
    }
  }
}
