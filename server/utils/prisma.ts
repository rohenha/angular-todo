import 'dotenv/config';
import mongo from '@prisma/orm-mongo/runtime';
import { contractFromJson } from '@prisma/orm-mongo/static';
import type { Contract } from '../../src/prisma/contract.d';
import contractJson from '../../src/prisma/contract.json' with { type: 'json' };

export const contract = contractFromJson<Contract>(contractJson);

export const db = mongo({
  contract,
  url: process.env['DATABASE_URL']!,
});
