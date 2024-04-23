import namegen from './../lib/namegen'
import { Context } from 'hono'
import { KnowGeneratorsType } from './api'

/**
 * #TOD  */
async function useNameGem (pattern: string | KnowGeneratorsType = '', limit: number) {
  if (namegen.hasOwnProperty(pattern.toUpperCase())) {
    pattern = namegen[pattern.toUpperCase() as KnowGeneratorsType]
  }

  return {
    data: Array.from({ length: limit }).map(i => new namegen.Generator(pattern).toString()),
    metadata: {
      pattern,
      limit,
    }
  }
}

export async function NameGenController (c: Context) {
  let limit = c.req.query('limit') ?? 100

  const generated = await useNameGem(
    c.req.param('pattern'),
    Number(limit)
  )

  try {
    return c.json({
      data: [
        ...generated.data
      ],
      metadata: {
        ...generated.metadata
      },
    })

  } catch (error) {
    console.error(error)
    return c.json({
      error: { message: `Error from server.` },
      data: [],
      metadata: {},
    })
  }
}