import { Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'

const app = new Hono({}).basePath('/api')

app.use(logger())

app.use('/etag/*', etag())

app.notFound((c) => {
  return c.redirect('/api')
})

app.get('/', (c) => {
  return c.text(`
Hello, friend. 👾

This project aims to provide an API using the beautiful fantasy name generator developed by "Edgar Alvarado (Pe1uca)". My thanks to him.

I just encapsuated to a framework to make available via API. Check it out \`${c.req.url}/docs\`  for more details. 

Have fun!
  `)
})


app.get('/docs', (c) => {
  return c.text(`TODO`)
})

app.get('/:pattern', (c) => {
  return c.json({
    data: [],
    metadata: {},
  })
})

export default app