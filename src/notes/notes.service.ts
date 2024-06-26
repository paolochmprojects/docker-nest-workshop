import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class NotesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createNoteDto: CreateNoteDto) {
    const newNote = await this.databaseService.note.create({
      data: { ...createNoteDto },
    });
    return newNote;
  }

  findAll() {
    return this.databaseService.note.findMany();
  }

  async findOne(id: string) {
    const note = await this.databaseService.note.findUnique({
      where: { id },
    });

    if (!note)
      throw new BadRequestException('Note not found which id -> ' + id);

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.findOne(id);
    const noteUpdated = await this.databaseService.note.update({
      where: { id },
      data: { ...updateNoteDto },
    });
    return noteUpdated;
  }

  async remove(id: string) {
    await this.findOne(id);
    const noteDeleted = await this.databaseService.note.delete({
      where: { id },
    });
    return noteDeleted;
  }
}
