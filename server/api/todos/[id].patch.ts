import { defineHandler } from 'nitro';
import { HTTPError, getRouterParam } from 'nitro/h3';
import vine from "@vinejs/vine"
import { db } from '../../utils/prisma'

const schema = vine.object({
  title: vine.string().optional(),
  completed: vine.boolean().optional(),
})
export default defineHandler(async (event) => {
  const contentType = event.req.headers.get('content-type') ?? '';
  const id = getRouterParam(event, 'id');
  if (!id) {
    throw new HTTPError({ status: 400, statusText: 'Bad Request', message: 'Missing todo id' });
  }
  try {
    const body = contentType.includes('application/json')
      ? await event.req.json() as { title: string, completed: boolean }
      : Object.fromEntries((await event.req.formData()).entries()) as unknown as { title: string, completed: boolean };
  
    const data = {
      title: body.title,
      completed: body.completed
    }
  
    const output = await vine.validate({
      schema,
      data
    })

    const todo = await db.orm.Todo
      .where({ id })
      .update(output);
    
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
