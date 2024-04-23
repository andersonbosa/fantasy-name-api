import { Context } from 'hono'

export async function NameGenController (c: Context) {
  try {
    return c.json({
      data: [],
      metadata: {},
    })

  } catch (error) {
    return c.json({
      error: { message: `` },
      data: [],
      metadata: {},
    })
  }
}