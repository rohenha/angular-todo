#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/5d9f96ee54770847cabcae99953395cbbfef09f3a9ab69fdda63cabb59654c04/contract';
import endContract from '../../snapshots/5d9f96ee54770847cabcae99953395cbbfef09f3a9ab69fdda63cabb59654c04/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, createCollection } from '@prisma/orm-mongo/target/migration';

class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      createCollection('Todo', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              completed: { bsonType: 'bool' },
              createdAt: { bsonType: 'date' },
              title: { bsonType: 'string' },
              updatedAt: { bsonType: 'date' },
            },
            required: ['_id', 'completed', 'createdAt', 'title', 'updatedAt'],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
    ];
  }
}

export default M;
MigrationCLI.run(import.meta.url, M);
