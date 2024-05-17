import { Context, Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { NameGenController } from './namegen.controller'
import { docsResponse, homeResponse } from './constants'

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
  const originUrl = c.req.url
  return c.text(homeResponse(originUrl))
})

app.get('/docs', (c: Context) => {
  let snippet = c.req.query('snippet') ?? ''
  const originUrl = c.req.url

  const currentOriginUrl = new URL(c.req.url.replace('/api/docs', ''))
  const currentOrigin = currentOriginUrl.origin.toString()

  return c.text(docsResponse(originUrl, snippet, currentOrigin))
})

app.get('/generate/:pattern', NameGenController)

export default app