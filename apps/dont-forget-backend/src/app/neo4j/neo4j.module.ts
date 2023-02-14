import { Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Module({})
export class Neo4jModule {
  providers: [Neo4jService];
}
