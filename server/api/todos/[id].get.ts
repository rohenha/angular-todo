import { defineHandler } from 'nitro';
import { HTTPError, getRouterParam } from 'nitro/h3';
import vine from "@vinejs/vine"
import { db } from '../../utils/prisma'

const schema = vine.object({
  title: vine.string()
})
export default defineHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) {
    throw new HTTPError({ status: 400, statusText: 'Bad Request', message: 'Missing todo id' });
  }
  try {
    const todo = await db.orm.Todo
      .where({ id })
      .first();
      
    if (!todo) {
      throw new HTTPError({ status: 404, statusText: 'Not Found', message: 'Todo not found' });
    }
    return todo
  } catch (error) {
    if (HTTPError.isError(error)) throw error;
    throw new HTTPError({
      status: 422,
      statusText: 'Unprocessable Content',
      message: 'Validation failed',
      data: {
        issues: (error as { messages?: unknown }).messages ?? []
      }
    })
  }
});
