import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [DatabaseModule],
})
export class NotesModule {}
