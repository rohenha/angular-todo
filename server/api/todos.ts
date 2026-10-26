import { defineHandler } from 'nitro';
import { db } from '../utils/prisma';

export default defineHandler(async () => {
  return await db.orm.Todo.orderBy({ createdAt: 1 }).all();
});
