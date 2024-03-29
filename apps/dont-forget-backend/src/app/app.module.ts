import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';

import { NoteBlocksModule } from './note-blocks/note-blocks.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Neo4jModule } from './neo4j/neo4j.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    NotesModule,
    TodosModule,
    AuthModule,
    NoteBlocksModule,
    AccountModule,
    Neo4jModule.forRootAsync({
      scheme: 'neo4j+s',
      host: process.env.NEO4J_HOST,
      username: process.env.NEO4J_USR,
      password: process.env.NEO4J_PWD,
      database: process.env.NEO4J_DATABASE,
    }),
  ],
  controllers: [AppController],
  
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
