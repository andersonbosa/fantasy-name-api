import { Context, Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { NameGenController } from './namegen.controller'

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
  let snippet = c.req.query('snippet') ?? ''

  const currentOriginUrl = new URL(c.req.url.replace('/api/docs', ''))
  const currentOrigin = currentOriginUrl.origin.toString()

  return c.text(`
# Documentation

> hack: use snippet param on url to change help with your tests :)
> example: ${c.req.url}?snippet=wget

# Syntax

${snippet} ${currentOrigin}/api/generate/:pattern
${snippet} ${currentOrigin}/api/generate/:pattern?limit=1000
${snippet} ${currentOrigin}/api/generate/:pattern?limit=1000&pretty


# Usage examples

${snippet} ${currentOrigin}/api/generate/justAstrAsPattern
${snippet} ${currentOrigin}/api/generate/MIDDLE_EARTH?limit=1000&pretty
${snippet} ${currentOrigin}/api/generate/pOkEmOn
${snippet} ${currentOrigin}/api/generate/CHINESE_NAMES
${snippet} ${currentOrigin}/api/generate/FANTASY_S_E


# Existing patterns

> its usage is case-insesitive.

- MIDDLE_EARTH
- JAPANESE_NAMES_CONSTRAINED
- JAPANESE_NAMES_DIVERSE
- CHINESE_NAMES
- GREEK_NAMES
- HAWAIIAN_NAMES_1
- HAWAIIAN_NAMES_2
- OLD_LATIN_PLACE_NAMES
- DRAGONS_PERN
- DRAGON_RIDERS
- POKEMON
- FANTASY_VOWELS_R
- FANTASY_S_A
- FANTASY_H_L
- FANTASY_N_L
- FANTASY_K_N
- FANTASY_J_G_Z
- FANTASY_K_J_Y
- FANTASY_S_E
`)
})

app.get('/generate/:pattern', NameGenController)

export default app