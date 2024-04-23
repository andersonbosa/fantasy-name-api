import { Context, Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'

/**
 * @hono_setup
 */

const app = new Hono({}).basePath('/api')

app.use(logger())

app.use('/etag/*', etag())

app.use(secureHeaders())

app.use(cors({
  origin: '*',
  allowMethods: ['GET'],
  maxAge: 600,
}))

app.use(prettyJSON())

/**
 * @hono_routes
*/

app.notFound((c: Context) => {
  return c.redirect('/api')
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

app.get('/', (c: Context) => {
  return c.text(`
Hello, friend. 👾

This project aims to provide an API using the beautiful fantasy name generator developed by "Edgar Alvarado (Pe1uca)". My thanks to him.

I just encapsuated to a framework to make available via API. Check it out \`${c.req.url}/docs\`  for more details.

Have fun!
  `)
})

app.get('/docs', (c: Context) => {
  return c.text(`TODO`)
})

app.get('/generate/:pattern', (c: Context) => {
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
})

export default app