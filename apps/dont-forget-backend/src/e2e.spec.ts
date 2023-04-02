import request = require('supertest');

import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';

import { NotesModule } from './app/notes/notes.module';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        mongod = await MongoMemoryServer.create();
        uri = mongod.getUri();
        return {
          uri,
        };
      },
    }),
    NotesModule,
    RouterModule.register([
      {
        path: 'notes',
        module: NotesModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class TestAppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
  }

  describe('Notes', () => {
    

}
