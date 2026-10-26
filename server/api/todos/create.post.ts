import { defineHandler } from 'nitro';
import { HTTPError } from 'nitro/h3';
import vine from "@vinejs/vine"
import { db } from '../../utils/prisma'

const schema = vine.object({
  title: vine.string()
})
export default defineHandler(async (event) => {
  const contentType = event.req.headers.get('content-type') ?? '';

  try {
    const body = contentType.includes('application/json')
      ? await event.req.json() as { title: string }
      : Object.fromEntries((await event.req.formData()).entries()) as { title: string };
  
    const data = {
      title: body.title
    }
  
    const output = await vine.validate({
      schema,
      data
    })

    const todo = await db.orm.Todo.create({
      title: output.title,
      completed: false
    })
    
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
